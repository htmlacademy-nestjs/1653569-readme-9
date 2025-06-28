import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { SortType, SortDirection, PostStatus } from '@project/core';
import { BlogPostQueryDefaults } from './blog-post.constants';
import { DECIMAL_RADIX } from '@project/helpers';

export class BlogPostQuery {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, DECIMAL_RADIX) || BlogPostQueryDefaults.Limit)
  public limit?: number = BlogPostQueryDefaults.Limit;

  @IsOptional()
  @IsArray()
  public tags?: string[];

  @IsOptional()
  @IsIn(Object.values(SortDirection))
  public sortDirection?: SortDirection = BlogPostQueryDefaults.SortDirection

  @IsOptional()
  @IsIn(Object.values(SortType))
  public sortBy?: SortType = BlogPostQueryDefaults.SortType

  @IsOptional()
  @IsIn(Object.values(PostStatus))
  public status?: PostStatus = BlogPostQueryDefaults.PostStatus

  @IsOptional()
  @Transform(({ value }) => parseInt(value, DECIMAL_RADIX) || BlogPostQueryDefaults.Page)
  public page?: number = BlogPostQueryDefaults.Page

  @IsOptional()
  @IsString()
  public search?: string
}
