import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';

export class UpdateQuotePostDTO {
  @IsOptional()
  @IsString()
  @ApiProperty(BlogPostApiProperty.Quote)
  @Length(BlogPostLimit.Quote.Min, BlogPostLimit.Quote.Max)
  public text!: string;

  @IsOptional()
  @IsString()
  @ApiProperty(BlogPostApiProperty.Author)
  @Length(BlogPostLimit.Author.Min, BlogPostLimit.Author.Max)
  public author!: string;
}
