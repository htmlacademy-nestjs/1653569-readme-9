import { IsIn, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

import { SortDirection } from "@project/core";
import { DECIMAL_RADIX } from "@project/helpers";
import { BlogCommentQueryDefaults } from "./blog-comment.constants";


export class BlogCommentQuery {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, DECIMAL_RADIX) || BlogCommentQueryDefaults.Limit)
  public limit: number = BlogCommentQueryDefaults.Limit;

  @IsOptional()
  @IsIn(Object.values(SortDirection))
  public sortDirection: SortDirection = BlogCommentQueryDefaults.SortDirection

  @IsOptional()
  @Transform(({ value }) => parseInt(value, DECIMAL_RADIX) || BlogCommentQueryDefaults.Page)
  public page: number = BlogCommentQueryDefaults.Page
}
