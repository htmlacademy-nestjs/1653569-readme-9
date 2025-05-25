import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from 'class-validator';

import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";
import { BlogCommentValidateLength } from "../blog-comment-module/blog-comment.constants";

export class CreateCommentDTO {
  @IsUUID()
  @ApiProperty(BlogCommentApiProperty.Id)
  public id?: string;

  @IsString()
  @Length(BlogCommentValidateLength.Text.Min, BlogCommentValidateLength.Text.Max)
  @ApiProperty(BlogCommentApiProperty.Text)
  public message!: string;

  @IsUUID()
  @ApiProperty(BlogCommentApiProperty.UserId)
  public userId!: string;
}
