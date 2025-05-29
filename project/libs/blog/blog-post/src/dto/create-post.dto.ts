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
  IsUUID,
  Length
} from 'class-validator';

import { Comment, PostState, PostType } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogPostValidateLength } from '../blog-post-module/blog-post.constants';

export class CreatePostDTO {
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
  public quoteText?: string;

  @IsOptional()
  @IsString()
  @Length(BlogPostValidateLength.Author.Min, BlogPostValidateLength.Author.Max)
  @ApiProperty(BlogPostApiProperty.Author)
  public quoteAuthor?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty(BlogPostApiProperty.LinkPath)
  public linkPath?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty(BlogPostApiProperty.RepostPostId)
  public repostedPostId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty(BlogPostApiProperty.RepostUserId)
  public repostedUserId?: string;

  @IsBoolean()
  @ApiProperty(BlogPostApiProperty.IsReposted)
  public isReposted!: boolean;

  @IsNumber()
  @ApiProperty(BlogPostApiProperty.CommentCount)
  public commentCount!: number;

  @IsNumber()
  @ApiProperty(BlogPostApiProperty.LikeCount)
  public likeCount!: number;

  @IsOptional()
  @IsArray()
  public comments?: Comment[];

  @IsMongoId()
  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;

  @IsEnum(PostState)
  @ApiProperty(BlogPostApiProperty.State)
  public state!: PostState;

  @IsArray()
  @IsUUID('all', { each: true })
  @ArrayMinSize(BlogPostValidateLength.Tags.Min)
  @ArrayMaxSize(BlogPostValidateLength.Tags.Max)
  @ApiProperty(BlogPostApiProperty.Tags)
  public tags?: string[];

  @IsEnum(PostType)
  @ApiProperty(BlogPostApiProperty.Type)
  public type!: PostType;
}
