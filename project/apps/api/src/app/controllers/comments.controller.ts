import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { CreateCommentDTO } from '@project/blog-comment';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import type { Request } from 'express';
import * as url from 'node:url';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { RequestWithTokenPayload } from '@project/core';

@Controller('comments')
@ApiTags('comments')
@ApiBearerAuth('JWT')
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @Get('/:postId')
  public async show(@Param('postId') postId: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${postId}?${url.parse(req.url).query}`);
    return data;
  }

  @Post('/:postId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/${postId}`, dto);
    return data;
  }

  @Delete('/:commentId')
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('commentId') commentId: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Comments}/${commentId}/${req.user?.sub}`);
    return data;
  };
}
