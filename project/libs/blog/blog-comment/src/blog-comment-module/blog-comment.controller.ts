import { Controller, Body, Post, Get, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentApiOperation, BlogCommentApiParam, BlogCommentApiResponse } from './blog-comment.constant';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { CommentRDO } from '../rdo/comment.rdo';

@ApiTags('Comments')
@Controller('comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiOperation(BlogCommentApiOperation.FindAll)
  @ApiParam(BlogCommentApiParam.PostId)
  @Get(':postId')
  public async showAll(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getCommentsByPostId(postId);
    return comments.map((comment) => fillDTO(CommentRDO, comment.toPOJO()));
  }

  @ApiOperation(BlogCommentApiOperation.Create)
  @ApiResponse(BlogCommentApiResponse.Created)
  @ApiResponse(BlogCommentApiResponse.NotFoundByPostId)
  @ApiParam(BlogCommentApiParam.PostId)
  @Post(':postId')
  public async create(@Param('postId') postId: string, @Body() dto: CreateCommentDTO) {
    const comment = await this.blogCommentService.createCommentByPostId(postId, dto);
    return fillDTO(CommentRDO, comment.toPOJO());
  }

  @ApiOperation(BlogCommentApiOperation.Delete)
  @ApiResponse(BlogCommentApiResponse.Deleted)
  @ApiResponse(BlogCommentApiResponse.NotFoundById)
  @ApiParam(BlogCommentApiParam.Id)
  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogCommentService.deleteCommentById(id);
  }
}
