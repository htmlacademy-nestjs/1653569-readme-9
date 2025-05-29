import { Controller, Body, Post, Get, Param, Patch, Delete, Query, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogPostService } from './blog-post.service';
import { BlogPostApiOperation, BlogPostApiOption, BlogPostApiResponse } from './blog-post.constants';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { PostRDO } from '../rdo/post.rdo';
import { PostWithPaginationRDO } from '../rdo/post-with-pagination.rdo';
import { BlogPostQuery } from './blog-post.query';
import { BlogCommentApiOperation, BlogCommentApiParam, BlogCommentApiResponse, CommentRDO, CreateCommentDTO } from '@project/blog-comment';

@ApiTags('Posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @ApiOperation(BlogPostApiOperation.FindAll)
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDTO(PostWithPaginationRDO, result);
  }

  @ApiOperation(BlogPostApiOperation.FindById)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Get('/:id')
  public async showById(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.blogPostService.getPostById(id);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.FindByTitle)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundByTitle)
  @ApiQuery(BlogPostApiOption.QueryTitle)
  @Get('/')
  public async showByTitle(@Query('title') title: string) {
    const post = await this.blogPostService.getPostByTitle(title);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Create)
  @ApiResponse(BlogPostApiResponse.Created)
  @Post('/')
  public async create(@Body() dto: CreatePostDTO) {
    const post = await this.blogPostService.createPost(dto);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Update)
  @ApiResponse(BlogPostApiResponse.Updated)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Patch('/:id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePostDTO) {
    const post = await this.blogPostService.updatePost(id, dto);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Delete)
  @ApiResponse(BlogPostApiResponse.Deleted)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.blogPostService.deletePost(id);
  }

  @ApiOperation(BlogCommentApiOperation.Create)
  @ApiResponse(BlogCommentApiResponse.Created)
  @ApiResponse(BlogCommentApiResponse.NotFoundByPostId)
  @ApiParam(BlogCommentApiParam.PostId)
  @Post('/:postId/comments')
  public async createComment(@Param('postId', ParseUUIDPipe) postId: string, @Body() dto: CreateCommentDTO) {
    const newComment = await this.blogPostService.addComment(postId, dto);
    return fillDTO(CommentRDO, newComment.toPOJO());
  }
}
