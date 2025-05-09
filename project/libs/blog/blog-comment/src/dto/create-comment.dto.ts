import { ApiProperty } from "@nestjs/swagger";
import { BlogCommentApiProperty } from "../blog-comment-module/blog-comment.property";

export class CreateCommentDTO {
  @ApiProperty(BlogCommentApiProperty.Id)
  public id?: string;

  @ApiProperty(BlogCommentApiProperty.Text)
  public text!: string;

  @ApiProperty(BlogCommentApiProperty.UserId)
  public userId!: string;
}
