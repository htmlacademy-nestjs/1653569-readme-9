import { ApiProperty } from '@nestjs/swagger';
import { BlogTagApiProperty } from '../blog-tag-module/blog-tag.property';

export class CreateTagDTO {
  @ApiProperty(BlogTagApiProperty.Title)
  public title!: string;
}
