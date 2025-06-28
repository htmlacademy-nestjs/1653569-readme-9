import { IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BlogPostApiProperty } from "../blog-post-module/blog-post.property";

export class UserIdDTO {
  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;
}
