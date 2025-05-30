import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";
import { BlogCommentMessage, BlogCommentValidateLength } from "../blog-comment-module/blog-comment.constants";

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty({ message: BlogCommentMessage.IsNotEmpty})
  @Length(BlogCommentValidateLength.Text.Min, BlogCommentValidateLength.Text.Max)
  @ApiProperty(BlogCommentApiProperty.Text)
  public message!: string;

  @IsMongoId({message: BlogCommentMessage.InvalidId})
  @ApiProperty(BlogCommentApiProperty.UserId)
  public userId!: string;
}
