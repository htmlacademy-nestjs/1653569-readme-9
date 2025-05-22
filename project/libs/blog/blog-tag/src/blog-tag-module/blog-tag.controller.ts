import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { fillDTO } from '@project/helpers';
import { BlogTagService } from './blog-tag.service';
import { CreateTagDTO } from '../dto/create-tag.dto';
import { TagRDO } from '../rdo/tag.rdo';
import { BlogTagApiOperation, BlogTagApiParam, BlogTagApiResponse } from './blog-tag.constants';
import { BlogTagApiProperty } from './blog-tag.property';

@Controller('tags')
export class BlogTagController {
  constructor(
    private readonly blogTagService: BlogTagService
  ) {}

  @ApiOperation(BlogTagApiOperation.FindAll)
  @Get('/list')
  public async index() {
    const blogTagEntities = await this.blogTagService.getAllTags();
    const tagEntities = blogTagEntities.map((tag) => tag.toPOJO());
    return fillDTO(TagRDO, tagEntities);
  }

  @ApiParam(BlogTagApiParam.Id)
  @ApiResponse(BlogTagApiResponse.Found)
  @ApiResponse(BlogTagApiResponse.NotFound)
  @Get('/:id')
  public async showById(@Param('id') id: string) {
    const tagEntity = await this.blogTagService.getTagById(id);
    return fillDTO(TagRDO, tagEntity.toPOJO());
  }

  @ApiQuery(BlogTagApiProperty.Title)
  @ApiResponse(BlogTagApiResponse.Found)
  @ApiResponse(BlogTagApiResponse.NotFound)
  @Get()
  public async showByTitle(@Query('title') title: string) {
    const tagEntity = await this.blogTagService.getTagByTitle(title);
    return fillDTO(TagRDO, tagEntity.toPOJO());
  }

  @ApiOperation(BlogTagApiOperation.Create)
  @ApiResponse(BlogTagApiResponse.Created)
  @ApiResponse(BlogTagApiResponse.Conflict)
  @Post()
  public async create(@Body() dto: CreateTagDTO) {
    const newTag = await this.blogTagService.createTag(dto);
    return fillDTO(TagRDO, newTag.toPOJO());
  }
}
