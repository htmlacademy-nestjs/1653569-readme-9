import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
  Inject,
  BadRequestException
} from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, User } from '@project/core';
import { AccountNotifyService } from '@project/account-notify';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload } from '@project/helpers';

import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { AuthUserMessage } from './authentication.constants';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly blogUserRepository: BlogUserRepository,
    private readonly accountNotifyService: AccountNotifyService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async registerUser(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { name, email, avatar, password } = dto;
    const blogUser = {
      name,
      email,
      avatar,
      createdAt: new Date(),
      postCount: 0,
      subscriberCount: 0,
      subscriptions: [],
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AuthUserMessage.UserExist);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)
    await this.blogUserRepository.save(userEntity);
    await this.accountNotifyService.registerSubscriber(dto);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDTO): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.EmailNotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserMessage.WrongPassword);
    }

    return existUser;
  }

  public async getUserById(userId: string): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.UserIdNotFound);
    }

    return existUser;
  }

  public async getUserByEmail(email: string): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.EmailNotFound);
    }

    return existUser;
  }

  public async changePassword(userId: string, dto: ChangePasswordDTO): Promise<BlogUserEntity> {
    const { currentPassword, newPassword } = dto;
    if (currentPassword === newPassword) {
      throw new ConflictException(AuthUserMessage.ComparePassword);
    }

    const existUser = await this.blogUserRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.UserIdNotFound);
    }

    if (!await existUser.comparePassword(currentPassword)) {
      throw new UnauthorizedException(AuthUserMessage.WrongPassword);
    }

    const updatedUser = await existUser.setPassword(newPassword);
    await this.blogUserRepository.update(updatedUser);
    return updatedUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + (error as Error).message);
      throw new HttpException('Token creating error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async incrementPostCount(userId: string) {
    const existUser = await this.blogUserRepository.findById(userId);
    if (existUser) {
      existUser.postCount += 1;
      await this.blogUserRepository.update(existUser);
    }
  }

  public async decrementPostCount(userId: string) {
    const existUser = await this.blogUserRepository.findById(userId);
    if (existUser) {
      existUser.postCount -= 1;
      console.log(existUser.postCount);
      await this.blogUserRepository.update(existUser);
    }
  }

  public async subscribe(userId: string, subscribeUserId: string): Promise<void> {
    if (userId === subscribeUserId) {
      throw new BadRequestException(AuthUserMessage.SubscribeSelf);
    }

    const subscriber = await this.getUserById(userId);
    const subscribeUser = await this.getUserById(subscribeUserId);
    if (subscribeUser.subscriptions.includes(subscriber.id as string)) {
      throw new ConflictException(AuthUserMessage.SubscriptionFound);
    }

    await subscribeUser.updateSubscription(subscriber.id as string);
    await Promise.all([
      this.blogUserRepository.update(subscriber),
      this.blogUserRepository.update(subscribeUser),
      this.accountNotifyService.updateSubscription({ email: subscribeUser.email, subscriptionId: subscriber.id as string })
    ])
  }

  public async unsubscribe(userId: string, subscribeUserId: string): Promise<void> {
    const subscriber = await this.getUserById(userId);
    const subscribeUser = await this.getUserById(subscribeUserId);
    if (!subscribeUser.subscriptions.includes(userId)) {
      throw new NotFoundException(AuthUserMessage.SubscriptionNotFound);
    }

    await subscribeUser.updateSubscription(subscriber.id as string);
    await Promise.all([
      this.blogUserRepository.update(subscriber),
      this.blogUserRepository.update(subscribeUser),
      this.accountNotifyService.updateSubscription({ email: subscribeUser.email, subscriptionId: subscriber.id as string })
    ])
  }

  public async getSubscriptions(userId: string): Promise<BlogUserEntity[]> {
    return this.blogUserRepository.findSubscriptions(userId);
  }
}
