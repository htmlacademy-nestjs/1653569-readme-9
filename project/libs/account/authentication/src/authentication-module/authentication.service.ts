import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { AuthUserMessage } from './authentication.constant';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async registerUser(dto: CreateUserDTO): Promise<BlogUserEntity> {
    const { name, email, avatarPath, password } = dto;

    const blogUser = {
      name,
      email,
      avatarPath,
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);
    if (existUser) {
      throw new ConflictException(AuthUserMessage.AlreadyExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)
    this.blogUserRepository.save(userEntity);
    return userEntity;
  }

  public async verifyUser(dto: LoginUserDTO) {
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

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    return user;
  }
}
