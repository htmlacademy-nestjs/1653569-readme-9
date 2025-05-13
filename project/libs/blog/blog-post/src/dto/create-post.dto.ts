import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length
} from 'class-validator';

import { PostState, PostType, Tag } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostValidateLength } from '../blog-post-module/blog-post.constants';

export class CreatePostDTO {
  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.Id)
  public id?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Title.Min, BlogPostValidateLength.Title.Max)
  @ApiProperty(BlogPostApiProperty.Title)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Text.Min, BlogPostValidateLength.Text.Max)
  @ApiProperty(BlogPostApiProperty.Text)
  public text?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Announcement.Min, BlogPostValidateLength.Announcement.Max)
  @ApiProperty(BlogPostApiProperty.Announcement)
  public announcement?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Description.Min, BlogPostValidateLength.Description.Max)
  @ApiProperty(BlogPostApiProperty.Description)
  public description?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Quote.Min, BlogPostValidateLength.Quote.Max)
  @ApiProperty(BlogPostApiProperty.Quote)
  public quote?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Author.Min, BlogPostValidateLength.Author.Max)
  @ApiProperty(BlogPostApiProperty.Author)
  public author?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty(BlogPostApiProperty.LinkPath)
  public linkPath?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.RepostPostId)
  public repostPostId?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.RepostUserId)
  public repostUserId?: string;

  @IsBoolean()
  @ApiProperty(BlogPostApiProperty.IsReposted)
  public isReposted!: boolean;

  @IsNumber()
  @ApiProperty(BlogPostApiProperty.CommentCount)
  public commentCount!: number;

  @IsNumber()
  @ApiProperty(BlogPostApiProperty.LikeCount)
  public likeCount!: number;

  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;

  @IsEnum(PostState)
  @ApiProperty(BlogPostApiProperty.State)
  public state!: PostState;

  @IsArray()
  @ArrayMinSize(BlogPostValidateLength.Tags.Min)
  @ArrayMaxSize(BlogPostValidateLength.Tags.Max)
  @IsString({ each: true })
  @Length(BlogPostValidateLength.Tag.Min, BlogPostValidateLength.Tag.Max)
  @ApiProperty(BlogPostApiProperty.Tags)
  public tags?: Tag[];

  @IsEnum(PostType)
  @ApiProperty(BlogPostApiProperty.Type)
  public type!: PostType;
}
