import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { MongoIdValidationPipe } from '@project/pipes';
import { BlogUserEntity } from '@project/blog-user';
import { UserIdDTO } from '@project/blog-post';

import { AuthenticationService } from './authentication.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoggedUserRDO } from '../rdo/logged-user.rdo';
import { UserRDO } from '../rdo/user.rdo';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { SubscribeUserDTO } from '../dto/subscribe-user.dto';
import { RegisterUserRDO } from '../rdo/register-user.rdo';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../guards/jet-refresh.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { RequestWithUser } from '../types/request-with-user.interface';
import { RequestWithTokenPayload } from '../types/request-with-token-payload.interface';
import {
  AuthUserApiHeader,
  AuthUserApiOperation,
  AuthUserApiParam,
  AuthUserApiResponse
} from './authentication.constants';

@ApiTags('Authentication')
@Controller('auth')
@ApiBearerAuth()
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @ApiOperation(AuthUserApiOperation.Register)
  @ApiCreatedResponse(AuthUserApiResponse.Created)
  @ApiConflictResponse(AuthUserApiResponse.Exists)
  @Post('register')
  public async create(@Body() dto: CreateUserDTO) {
    const newUser = await this.authenticationService.registerUser(dto);
    return fillDTO(RegisterUserRDO, newUser.toPOJO());
  }

  @ApiOperation(AuthUserApiOperation.Login)
  @ApiOkResponse(AuthUserApiResponse.Logged)
  @ApiUnauthorizedResponse(AuthUserApiResponse.Unauthorized)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authenticationService.createUserToken(user as BlogUserEntity);
    return fillDTO(LoggedUserRDO, { ...user?.toPOJO(), ...userToken });
  }

  @ApiOperation(AuthUserApiOperation.User)
  @ApiOkResponse(AuthUserApiResponse.Found)
  @ApiNotFoundResponse(AuthUserApiResponse.UserIdNotFound)
  @ApiParam(AuthUserApiParam.UserId)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authenticationService.getUserById(id);
    return fillDTO(UserRDO, existUser.toPOJO());
  }

  @ApiCreatedResponse(AuthUserApiResponse.UpdatePassword)
  @ApiNotFoundResponse(AuthUserApiResponse.UserIdNotFound)
  @ApiUnauthorizedResponse(AuthUserApiResponse.Unauthorized)
  @ApiParam(AuthUserApiParam.UserId)
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  public async changePassword(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: ChangePasswordDTO
  ) {
    const updatedUser = await this.authenticationService.changePassword(payload?.sub as string, dto);
    return fillDTO(UserRDO, updatedUser.toPOJO());
  }

  @ApiResponse(AuthUserApiResponse.RefreshToken)
  @ApiHeader(AuthUserApiHeader.RefreshToken)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authenticationService.createUserToken(user as BlogUserEntity);
  }

  @ApiHeader(AuthUserApiHeader.AccessToken)
  @ApiHeader(AuthUserApiHeader.RefreshToken)
  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @Post('incPostCount')
  public async incrementPostCount(@Body() dto: UserIdDTO) {
    this.authenticationService.incrementPostCount(dto.userId);
  }

  @Post('decPostCount')
  public async decrementPostCount(@Body() dto: UserIdDTO) {
    this.authenticationService.decrementPostCount(dto.userId);
  }

  @Post('subscribe')
  @ApiOperation(AuthUserApiOperation.Subscribe)
  @ApiOkResponse(AuthUserApiResponse.Subscribe)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async subscribe(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: SubscribeUserDTO
  ) {
    return this.authenticationService.subscribe(payload?.sub as string, dto.userId);
  }

  @Post('unsubscribe')
  @ApiOperation(AuthUserApiOperation.Unsubscribe)
  @ApiOkResponse(AuthUserApiResponse.Unsubscribe)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async unsubscribe(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: SubscribeUserDTO
  ) {
    return this.authenticationService.unsubscribe(payload?.sub as string, dto.userId);
  }

  @Get(':id/subscriptions')
  @ApiOperation(AuthUserApiOperation.Subscriptions)
  @ApiOkResponse({ type: [UserRDO] })
  @ApiParam(AuthUserApiParam.UserId)
  @UseGuards(JwtAuthGuard)
  public async getSubscriptions(@Param('id', MongoIdValidationPipe) id: string) {
    const subscriptions = await this.authenticationService.getSubscriptions(id);
    return fillDTO(UserRDO, subscriptions.map((user) => user.toPOJO()));
  }
}
