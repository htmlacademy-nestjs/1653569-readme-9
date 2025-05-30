import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Delete, HttpStatus, HttpCode, Body } from '@nestjs/common';

import { fillDTO } from '@project/helpers';
import { LikeRDO } from '../rdo/like.rdo';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeApiOperation, BlogLikeApiResponse } from './blog-like.constants';
import { CreateLikeDTO } from '../dto/create-like.dto';

@ApiTags('Likes')
@Controller('likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService
  ) {}

  @ApiOperation(BlogLikeApiOperation.Create)
  @ApiResponse(BlogLikeApiResponse.Created)
  @ApiResponse(BlogLikeApiResponse.Conflict)
  @Post('/')
  public async create(@Body() dto: CreateLikeDTO) {
    const like = await this.blogLikeService.createLike(dto);
    return fillDTO(LikeRDO, like.toPOJO());
  }

  @ApiOperation(BlogLikeApiOperation.Delete)
  @ApiResponse(BlogLikeApiResponse.Deleted)
  @ApiResponse(BlogLikeApiResponse.NotFound)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/')
  public async delete(@Body() dto: CreateLikeDTO) {
    await this.blogLikeService.deleteLike(dto);
  }
}
