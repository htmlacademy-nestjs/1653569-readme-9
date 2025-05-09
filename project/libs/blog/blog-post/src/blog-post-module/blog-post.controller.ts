import { Controller, Body, Post, Get, Param, Patch, Delete, Query, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogPostService } from './blog-post.service';
import { BlogPostApiOperation, BlogPostApiOption, BlogPostApiResponse } from './blog-post.constant';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { PostRDO } from '../rdo/post.rdo'

@ApiTags('Posts')
@Controller('post')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @ApiOperation(BlogPostApiOperation.FindAll)
  @Get('/list')
  public async showAll() {
    const posts =  await this.blogPostService.getPosts();
    return posts.map((post) => fillDTO(PostRDO, post.toPOJO()));
  }

  @ApiOperation(BlogPostApiOperation.FindById)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Get(':id')
  public async showById(@Param('id') id: string) {
    const post = await this.blogPostService.findPostById(id);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.FindByTitle)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundByTitle)
  @ApiQuery(BlogPostApiOption.QueryTitle)
  @Get()
  public async showByTitle(@Query('title') title: string) {
    const post = await this.blogPostService.findPostByTitle(title);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Create)
  @ApiResponse(BlogPostApiResponse.Created)
  @Post()
  public async create(@Body() dto: CreatePostDTO) {
    const post = await this.blogPostService.createPost(dto);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Update)
  @ApiResponse(BlogPostApiResponse.Updated)
  @ApiResponse(BlogPostApiResponse.Found)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDTO) {
    const post = await this.blogPostService.updatePostById(id, dto);
    return fillDTO(PostRDO, post.toPOJO());
  }

  @ApiOperation(BlogPostApiOperation.Delete)
  @ApiResponse(BlogPostApiResponse.Deleted)
  @ApiResponse(BlogPostApiResponse.NotFoundById)
  @ApiParam(BlogPostApiOption.ParamPostId)
  @HttpCode(204)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.deletePostById(id);
  }
}
