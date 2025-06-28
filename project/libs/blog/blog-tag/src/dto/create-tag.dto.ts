import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { BlogTagApiProperty } from '../blog-tag-module/blog-tag.property';
import { BlogTagLimit } from '../blog-tag-module/blog-tag.constants';

export class CreateTagDTO {
  @IsString()
  @ApiProperty(BlogTagApiProperty.Title)
  @Length(BlogTagLimit.Title.Min, BlogTagLimit.Title.Max)
  public title!: string;
}
