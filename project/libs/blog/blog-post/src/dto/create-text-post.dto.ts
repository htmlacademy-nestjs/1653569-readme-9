import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';

export class CreateTextPostDTO {
  @IsString()
  @ApiProperty(BlogPostApiProperty.Title)
  @Length(BlogPostLimit.Title.Min, BlogPostLimit.Title.Max)
  public title!: string;

  @IsString()
  @ApiProperty(BlogPostApiProperty.Announcement)
  @Length(BlogPostLimit.Announcement.Min, BlogPostLimit.Announcement.Max)
  public announcement!: string;

  @IsString()
  @ApiProperty(BlogPostApiProperty.Text)
  @Length(BlogPostLimit.Text.Min, BlogPostLimit.Text.Max)
  public text!: string;
}
