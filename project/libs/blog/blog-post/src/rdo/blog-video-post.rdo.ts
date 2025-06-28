import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class BlogVideoPostRDO {
  @ApiProperty(BlogPostApiProperty.Title)
  @Expose()
  public title!: string;

  @ApiProperty(BlogPostApiProperty.Url)
  @Expose()
  public url!: string;
}
