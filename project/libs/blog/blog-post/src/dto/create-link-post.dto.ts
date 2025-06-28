import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';

export class CreateLinkPostDTO {
  @IsUrl({})
  @ApiProperty(BlogPostApiProperty.Url)
  public url!: string;

  @IsOptional()
  @IsString()
  @ApiProperty(BlogPostApiProperty.Description)
  @Length(BlogPostLimit.DescriptionLink.Min, BlogPostLimit.DescriptionLink.Max)
  public description?: string;
}
