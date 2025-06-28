import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from 'class-validator';

import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";
import { BlogCommentMessage } from "../blog-comment-module/blog-comment.constants";

export class DeleteCommentDTO {
  @IsMongoId({ message: BlogCommentMessage.InvalidId })
  @ApiProperty(BlogCommentApiProperty.UserId)
  public userId!: string;
}
