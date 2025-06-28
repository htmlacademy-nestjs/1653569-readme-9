import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class BlogQuotePostRDO {
  @ApiProperty(BlogPostApiProperty.Author)
  @Expose()
  public author!: string;

  @ApiProperty(BlogPostApiProperty.Text)
  @Expose()
  public text!: string;
}
