import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class BlogPhotoPostRDO {
  @ApiProperty(BlogPostApiProperty.Static)
  @Expose()
  public path!: string;
}
