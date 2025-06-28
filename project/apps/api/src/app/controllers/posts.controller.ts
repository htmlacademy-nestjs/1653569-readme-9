import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request } from 'express';

import { InjectEmailInterceptor, InjectUserIdInterceptor } from '@project/interceptors';
import { CreatePostDTO, UpdatePostDTO, UserEmailDTO, UserIdDTO } from '@project/blog-post';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { ApplicationServiceURL } from '../app.config';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';
import url from 'node:url';
import { createUploadURL } from '@project/helpers';
import type { AuthUser, File, RequestWithTokenPayload } from '@project/core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth('JWT')
@UseFilters(AxiosExceptionFilter)
export class PostsController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @Get('/')
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}?${url.parse(req.url).query}`);
    return data;
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @Post('/')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() dto: CreatePostDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false
      }),
    ) file?: Express.Multer.File) {

    if (file) {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname)
      const { data } = await this.httpService.axiosRef.post<File>(
        `${ApplicationServiceURL.Storage}/api/files/upload`,
        formData,
        { headers: formData.getHeaders() });

      if (dto.photo) {
        dto.photo.path = createUploadURL(data, ApplicationServiceURL.Storage);
      }
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}`, dto);
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/incPostCount`, { userId: dto.userId });
    return data;
  }

  @Patch('/:id')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDTO) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto);
    return data;
  }

  @Delete('/:id')
  @UseGuards(CheckAuthGuard)
  public async delete(@Param('id') id: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}/${req.user?.sub}`);
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/decPostCount`, { userId: req.user?.sub });
    return data;
  }

  @Get('/draft')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async findDraft(@Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${req.user?.sub}?status=draft`);
    return data;
  }

  @Post('/:postId/like')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.CREATED)
  public async createLike(@Param('postId') postId: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/${req.user?.sub}/like`);
    return data;
  }

  @Post('/:postId/unlike')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeLike(@Param('postId') postId: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/${req.user?.sub}/unlike`);
    return data;
  }

  @Post('/:postId/repost')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async createRepost(@Param('postId') postId: string, @Body() dto: UserIdDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/repost`, dto);
    return data;
  }

  @Post('/sendEmail')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectEmailInterceptor)
  public async sendEmail(@Body() dto: UserEmailDTO) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/sendPosts`, dto);
  }

  @Post('/feed')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async feed(@Req() req: Request, @Body() { userId }: UserIdDTO) {
    const { data: user } = await this.httpService.axiosRef.get<AuthUser>(`${ApplicationServiceURL.Users}/${userId}`, {
      headers: { Authorization: req.headers['authorization'] }
    });
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/feed?${url.parse(req.url).query}`, [...user.subscriptions, userId]);
    return data;
  }
}
