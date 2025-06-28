import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostRDO } from './blog-post.rdo';

export class BlogPostWithPaginationRDO {
  @ApiProperty(BlogPostApiProperty.Entities)
  @Expose()
  @Type(() => BlogPostRDO)
  public entities!: BlogPostRDO[];

  @ApiProperty(BlogPostApiProperty.TotalPages)
  @Expose()
  public totalPages!: number;

  @ApiProperty(BlogPostApiProperty.CurrentPages)
  @Expose()
  public currentPage!: number;

  @ApiProperty(BlogPostApiProperty.TotalItems)
  @Expose()
  public totalItems!: number;

  @ApiProperty(BlogPostApiProperty.ItemsPerPage)
  @Expose()
  public itemsPerPage!: number;
}
