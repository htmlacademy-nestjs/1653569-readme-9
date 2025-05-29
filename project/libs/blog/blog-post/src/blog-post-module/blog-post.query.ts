import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { SortDirection } from '@project/core';
import { BlogPostDefault } from './blog-post.constants';

export class BlogPostQuery {
  @Transform(({ value }) => +value || BlogPostDefault.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit = BlogPostDefault.PostCountLimit;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = BlogPostDefault.SortDirection;

  @Transform(({ value }) => +value || BlogPostDefault.PageCount)
  @IsOptional()
  public page: number = BlogPostDefault.PageCount;
}
