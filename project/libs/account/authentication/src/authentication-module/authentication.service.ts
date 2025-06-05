import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger
} from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { Token, TokenPayload, User } from '@project/core';

import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { AuthUserMessage } from './authentication.constants';
import { AccountNotifyService } from '@project/account-notify';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly notifyService: AccountNotifyService,
    private readonly jwtService: JwtService,
  ) {}

  public async registerUser(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { name, email, avatarPath, password } = dto;

    const blogUser = {
      name,
      email,
      avatarPath,
      createdAt: new Date(),
      postCount: 0,
      subscribers: [],
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AuthUserMessage.AlreadyExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)
    await this.blogUserRepository.save(userEntity);
    await this.notifyService.registerSubscriber(dto);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDTO): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthUserMessage.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id as string,
      email: user.email,
      name: user.name,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + (error as Error).message);
      throw new HttpException('Token creating error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
