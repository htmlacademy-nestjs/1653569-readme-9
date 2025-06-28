import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class BlogLinkPostRDO {
  @ApiProperty(BlogPostApiProperty.Url)
  @Expose()
  public url!: string;

  @ApiProperty(BlogPostApiProperty.Description)
  @Expose()
  public description?: string;
}
