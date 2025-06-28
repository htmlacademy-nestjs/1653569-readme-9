import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { BlogCommentRDO } from "../rdo/blog-comment.rdo";
import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";

export class BlogCommentWithPaginationRDO {
  @ApiProperty(BlogCommentApiProperty.Entities)
  @Type(() => BlogCommentRDO)
  @Expose()
  public entities!: BlogCommentRDO[];

  @ApiProperty(BlogCommentApiProperty.TotalPages)
  @Expose()
  public totalPages!: number;

  @ApiProperty(BlogCommentApiProperty.CurrentPages)
  @Expose()
  public currentPage!: number;

  @ApiProperty(BlogCommentApiProperty.TotalItems)
  @Expose()
  public totalItems!: number;

  @ApiProperty(BlogCommentApiProperty.ItemsPerPage)
  @Expose()
  public itemsPerPage!: number;
}
