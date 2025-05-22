import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogTagApiProperty } from '../blog-tag-module/blog-tag.property';

export class TagRDO {
  @ApiProperty(BlogTagApiProperty.Id)
  @Expose()
  public id!: string;

  @ApiProperty(BlogTagApiProperty.Title)
  @Expose()
  public title!: string;
}
