import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { BlogTagApiProperty } from '../blog-tag-module/blog-tag.property';
import { BlogTagValidateLength } from '../blog-tag-module/blog-tag.constants';

export class CreateTagDTO {
  @IsString()
  @Length(BlogTagValidateLength.Title.Min, BlogTagValidateLength.Title.Max)
  @ApiProperty(BlogTagApiProperty.Title)
  public title!: string;
}
