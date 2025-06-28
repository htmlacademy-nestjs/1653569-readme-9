import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class BlogTextPostRDO {
  @ApiProperty(BlogPostApiProperty.Title)
  @Expose()
  public title!: string;

  @ApiProperty(BlogPostApiProperty.Announcement)
  @Expose()
  public announcement!: string;

  @ApiProperty(BlogPostApiProperty.Text)
  @Expose()
  public text!: string;
}
