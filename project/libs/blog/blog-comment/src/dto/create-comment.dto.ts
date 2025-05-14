import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsMongoId, Length } from 'class-validator';

import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";
import { BlogCommentValidateLength } from "../blog-comment-module/blog-comment.constants";

export class CreateCommentDTO {
  @IsMongoId()
  @ApiProperty(BlogCommentApiProperty.Id)
  public id?: string;

  @IsString()
  @Length(BlogCommentValidateLength.Text.Min, BlogCommentValidateLength.Text.Max)
  @ApiProperty(BlogCommentApiProperty.Text)
  public text!: string;

  @IsMongoId()
  @ApiProperty(BlogCommentApiProperty.UserId)
  public userId!: string;
}
