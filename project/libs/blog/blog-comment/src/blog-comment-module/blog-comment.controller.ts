import { Controller, Get, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogCommentService } from './blog-comment.service';
import { CommentRDO } from '../rdo/comment.rdo';
import {
  BlogCommentApiOperation,
  BlogCommentApiParam,
  BlogCommentApiResponse
} from './blog-comment.constants';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiOperation(BlogCommentApiOperation.FindAll)
  @ApiParam(BlogCommentApiParam.PostId)
  @Get('/')
  public async showAll(@Param('postId', ParseUUIDPipe) postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDTO(CommentRDO, comments.map((comment) => comment.toPOJO()));
  }

  @ApiOperation(BlogCommentApiOperation.Delete)
  @ApiResponse(BlogCommentApiResponse.Deleted)
  @ApiResponse(BlogCommentApiResponse.NotFoundById)
  @ApiParam(BlogCommentApiParam.Id)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.blogCommentService.deleteComment(id);
  }
}
