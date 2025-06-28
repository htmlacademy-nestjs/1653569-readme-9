import type { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';

import { ChangePasswordDTO, CreateUserDTO, LoginUserDTO, SubscribeUserDTO } from '@project/authentication'

import { ApplicationServiceURL } from '../app.config';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import FormData from 'form-data';
import { File } from '@project/core';
import { createUploadURL } from '@project/helpers';
import { MongoIdValidationPipe } from '@project/pipes';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const DEFAULT_AVATAR_PATH = `${ApplicationServiceURL.Storage}/static/default-avatar.png`

@Controller('users')
@ApiTags('account')
@ApiBearerAuth('JWT')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreateUserDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false
      }),
    ) avatar?: Express.Multer.File) {

    dto.avatar = DEFAULT_AVATAR_PATH
    if (avatar) {
      const formData = new FormData();
      formData.append('file', avatar.buffer, avatar.originalname)
      const { data } = await this.httpService.axiosRef.post<File>(
        `${ApplicationServiceURL.Storage}/api/files/upload`,
        formData,
        { headers: formData.getHeaders() }
      );

      dto.avatar = createUploadURL(data, ApplicationServiceURL.Storage);
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
    return data;
  }

  @Post('/login')
  public async login(@Body() dto: LoginUserDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, dto);
    return data;
  }

  @Patch('/password')
  public async update(@Body() dto: ChangePasswordDTO, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/password`, dto, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Get('/:id')
  public async show(@Param('id', MongoIdValidationPipe) id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Post('/refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Post('/check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, null, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Post('/subscribe')
  public async subscribe(@Body() dto: SubscribeUserDTO, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/subscribe`, dto, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Post('/unsubscribe')
  public async unsubscribe(@Body() dto: SubscribeUserDTO, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/unsubscribe`, dto, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }

  @Get(':id/subscriptions')
  public async getSubscriptions(@Param('id', MongoIdValidationPipe) id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}/subscriptions`, {
      headers: { Authorization: req.headers['authorization'] }
    });

    return data;
  }
}
