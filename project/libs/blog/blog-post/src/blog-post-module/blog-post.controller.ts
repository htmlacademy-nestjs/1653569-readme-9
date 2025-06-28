import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlogLikeService } from '@project/blog-like';
import { BlogNotifyService } from '@project/blog-notify';
import { fillDTO } from '@project/helpers'

import { BlogPostService } from './blog-post.service';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostRDO } from '../rdo/blog-post.rdo';
import { BlogPostWithPaginationRDO } from '../rdo/blog-post-with-pagination.rdo';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { UserIdDTO } from '../dto/user-id.dto';
import { UserEmailDTO } from '../dto/user-email.dto';
import { BlogPostApiOperation, BlogPostApiOption, BlogPostApiResponse } from './blog-post.constants';

@ApiTags('Blog Posts')
@Controller('/posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly blogLikeService: BlogLikeService,
    private readonly blogNotifyService: BlogNotifyService
  ) {}

  @ApiOperation(BlogPostApiOperation.FindAll)
  @ApiOkResponse(BlogPostApiResponse.FoundAll)
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getPosts(query);
    const result = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((post) => post.toPOJO())
    }

    return fillDTO(BlogPostWithPaginationRDO, result);
  }

  @ApiOperation(BlogPostApiOperation.FindAll)
  @ApiOkResponse(BlogPostApiResponse.FoundAll)
  @Get('/:userId')
  public async findDrafts(@Param('userId') userId: string, @Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getPosts(query, [userId]);
    const result = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((post) => post.toPOJO())
    }

    return fillDTO(BlogPostWithPaginationRDO, result);
  }

  @ApiOperation(BlogPostApiOperation.FindById)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Get('/:id')
  public async show(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDTO(BlogPostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Create)
  @ApiResponse(BlogPostApiResponse.Created)
  @Post('/')
  public async create(@Body() dto: CreatePostDTO) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDTO(BlogPostRDO, newPost.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Repost)
  @ApiOperation(BlogPostApiOperation.FindById)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiResponse(BlogPostApiResponse.Created)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Post('/:postId/repost')
  public async createRepost(
    @Param('postId') postId: string,
    @Body() { userId }: UserIdDTO
  ) {
    const newPost = await this.blogPostService.createRepost(postId, userId);
    return fillDTO(BlogPostRDO, newPost.toPOJO());
  }

  @ApiResponse(BlogPostApiResponse.Updated)
  @ApiResponse(BlogPostApiResponse.Unauthorized)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiResponse(BlogPostApiResponse.NotAllowed)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDTO
  ) {
    const post = await this.blogPostService.updatePost(id, dto);
    return fillDTO(BlogPostRDO, post.toPOJO());
  }

  @ApiResponse(BlogPostApiResponse.Deleted)
  @ApiResponse(BlogPostApiResponse.Unauthorized)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiResponse(BlogPostApiResponse.NotAllowed)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:postId/:userId')
  public async delete(
    @Param('postId') postId: string,
    @Param('userId') userId: string
  ) {
    await this.blogPostService.deletePost(postId, userId);
  }

  @ApiResponse(BlogPostApiResponse.Like)
  @ApiResponse(BlogPostApiResponse.Unauthorized)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @Post('/:postId/:userId/like')
  @HttpCode(HttpStatus.CREATED)
  public async addLike(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    await this.blogLikeService.createLike({ postId, userId });
  }

  @ApiResponse(BlogPostApiResponse.Unlike)
  @ApiResponse(BlogPostApiResponse.Unauthorized)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @Post('/:postId/:userId/unlike')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeLike(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    await this.blogLikeService.deleteLike({ postId, userId });
  }

  @ApiResponse(BlogPostApiResponse.Unauthorized)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @Post('/sendPosts')
  @HttpCode(HttpStatus.OK)
  public async sendPosts(
    @Query() query: BlogPostQuery,
    @Body() { email }: UserEmailDTO
  ) {
    const { entities } = await this.blogPostService.getPosts(query);
    const posts = entities.map((post) => post.toPOJO());
    await this.blogNotifyService.sendEmail({ posts, email });
  }

  @ApiResponse(BlogPostApiResponse.FoundAll)
  @Post('/feed')
  public async feed(
    @Query() query: BlogPostQuery,
    @Body() userIds: string[]
  ) {
    const postWithPagination = await this.blogPostService.getPosts(query, userIds);
    const post = {
      ...postWithPagination,
      entities: postWithPagination.entities.map((post) => post.toPOJO())
    }

    return fillDTO(BlogPostWithPaginationRDO, post);
  }
}
