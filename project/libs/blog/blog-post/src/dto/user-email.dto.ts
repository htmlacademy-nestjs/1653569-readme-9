import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BlogPostApiProperty } from "../blog-post-module/blog-post.property";

export class UserEmailDTO {
  @IsEmail()
  @ApiProperty(BlogPostApiProperty.Email  )
  public email!: string;
}
