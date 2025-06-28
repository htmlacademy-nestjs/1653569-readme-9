import { ArrayMaxSize, ArrayUnique, IsArray, IsEnum, IsMongoId, IsOptional, Length, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PostStatus } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';
import { UpdateTextPostDTO } from './update-text-post.dto';
import { UpdateVideoPostDTO } from './update-video-post.dto';
import { UpdatePhotoPostDTO } from './update-photo-post.dto';
import { UpdateLinkPostDTO } from './update-link-post.dto';
import { UpdateQuotePostDTO } from './update-quote-post.dto';

export class UpdatePostDTO {

  @IsOptional()
  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;

  @IsOptional()
  @IsEnum(PostStatus)
  @ApiProperty(BlogPostApiProperty.Status)
  public status!: PostStatus;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(BlogPostLimit.Tags.Max)
  @Length(BlogPostLimit.Tag.Min, BlogPostLimit.Tag.Max, { each: true })
  @ApiProperty(BlogPostApiProperty.Tags)
  public tags?: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateTextPostDTO)
  public text?: UpdateTextPostDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateVideoPostDTO)
  public video?: UpdateVideoPostDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdatePhotoPostDTO)
  public photo?: UpdatePhotoPostDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateLinkPostDTO)
  public link?: UpdateLinkPostDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateQuotePostDTO)
  public quote?: UpdateQuotePostDTO;
}
