import { Controller, Get, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe, Query, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogCommentService } from './blog-comment.service';
import {
  BlogCommentApiOperation,
  BlogCommentApiParam,
  BlogCommentApiResponse
} from './blog-comment.constants';
import { BlogCommentQuery } from './blog-comment-query';
import { BlogCommentWithPaginationRDO } from '../dto/blog-comment-wtih-pagination';
import { BlogCommentRDO } from '../rdo/blog-comment.rdo';
import { CreateCommentDTO } from '../dto/create-comment.dto';

@ApiTags('Comments')
@Controller('/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiOperation(BlogCommentApiOperation.FindAll)
  @ApiResponse(BlogCommentApiResponse.Found)
  @ApiResponse(BlogCommentApiResponse.NotFoundByPostId)
  @ApiParam(BlogCommentApiParam.PostId)
  @Get('/:postId')
  public async show(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: BlogCommentQuery
  ) {
    const comments = await this.blogCommentService.getComments(postId, query);
    return fillDTO(BlogCommentWithPaginationRDO, comments);
  }

  @ApiOperation(BlogCommentApiOperation.Create)
  @ApiResponse(BlogCommentApiResponse.Found)
  @ApiResponse(BlogCommentApiResponse.NotFoundByPostId)
  @ApiParam(BlogCommentApiParam.PostId)
  @Post('/:postId')
  public async create(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDTO
  ) {
    const newComment = await this.blogCommentService.createComment(dto, postId);
    return fillDTO(BlogCommentRDO, newComment);
  }

  @ApiOperation(BlogCommentApiOperation.Delete)
  @ApiResponse(BlogCommentApiResponse.Deleted)
  @ApiResponse(BlogCommentApiResponse.NotFoundById)
  @ApiParam(BlogCommentApiParam.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:commentId/:userId')
  public async delete(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Param('userId') userId: string
  ) {
    await this.blogCommentService.deleteComment(commentId, userId);
  };
}
