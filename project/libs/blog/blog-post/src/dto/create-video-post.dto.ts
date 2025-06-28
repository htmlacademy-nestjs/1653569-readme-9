import { IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';

export class CreateVideoPostDTO {
  @IsString()
  @ApiProperty(BlogPostApiProperty.Title)
  @Length(BlogPostLimit.Title.Min, BlogPostLimit.Title.Max)
  public title!: string;

  @IsUrl({})
  @ApiProperty(BlogPostApiProperty.Url)
  public url!: string;
}
