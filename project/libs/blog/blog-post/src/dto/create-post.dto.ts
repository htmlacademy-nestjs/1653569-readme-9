import { ArrayMaxSize, ArrayUnique, IsArray, IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsUUID, Length, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PostStatus, PostType } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostLimit } from '../blog-post-module/blog-post.constants';
import { CreateTextPostDTO } from './create-text-post.dto';
import { CreateVideoPostDTO } from './create-video-post.dto';
import { CreatePhotoPostDTO } from './create-photo-post.dto';
import { CreateLinkPostDTO } from './create-link-post.dto';
import { CreateQuotePostDTO } from './create-quote-post.dto';

export class CreatePostDTO {
  @IsOptional()
  @IsUUID()
  @ApiProperty(BlogPostApiProperty.RepostPostId)
  public repostedPostId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty(BlogPostApiProperty.RepostUserId)
  public repostedUserId?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty(BlogPostApiProperty.IsReposted)
  public isReposted?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty(BlogPostApiProperty.CommentCount)
  public commentCount?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty(BlogPostApiProperty.LikeCount)
  public likeCount?: number;

  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;

  @IsOptional()
  @IsEnum(PostStatus)
  @ApiProperty(BlogPostApiProperty.Status)
  public status!: PostStatus;

  @IsEnum(PostType)
  @ApiProperty(BlogPostApiProperty.Type)
  public type!: PostType;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(BlogPostLimit.Tags.Max)
  @Length(BlogPostLimit.Tag.Min, BlogPostLimit.Tag.Max, { each: true })
  @ApiProperty(BlogPostApiProperty.Tags)
  public tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTextPostDTO)
  public text?: CreateTextPostDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateVideoPostDTO)
  public video?: CreateVideoPostDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePhotoPostDTO)
  public photo?: CreatePhotoPostDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLinkPostDTO)
  public link?: CreateLinkPostDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateQuotePostDTO)
  public quote?: CreateQuotePostDTO;
}
