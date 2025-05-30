import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Comment, PostState, PostType } from '@project/core';
import { TagRDO } from '@project/blog-tag';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class PostRDO {
  @ApiProperty(BlogPostApiProperty.Title)
  @Expose()
  public title?: string;

  @ApiProperty(BlogPostApiProperty.Text)
  @Expose()
  public text?: string;

  @ApiProperty(BlogPostApiProperty.Announcement)
  @Expose()
  public announcement?: string;

  @ApiProperty(BlogPostApiProperty.Description)
  @Expose()
  public description?: string;

  @ApiProperty(BlogPostApiProperty.Quote)
  @Expose()
  public quoteText?: string;

  @ApiProperty(BlogPostApiProperty.Author)
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty(BlogPostApiProperty.LinkPath)
  @Expose()
  public linkPath?: string;

  @ApiProperty(BlogPostApiProperty.RepostPostId)
  @Expose()
  public repostedPostId?: string;

  @ApiProperty(BlogPostApiProperty.RepostUserId)
  @Expose()
  public repostedUserId?: string;

  @ApiProperty(BlogPostApiProperty.IsReposted)
  @Expose()
  public isReposted?: boolean;

  @ApiProperty(BlogPostApiProperty.CommentCount)
  @Expose()
  public commentCount?: number;

  @ApiProperty(BlogPostApiProperty.LikeCount)
  @Expose()
  public likeCount?: number;

  @Expose()
  public comments?: Comment[];

  @ApiProperty(BlogPostApiProperty.UserId)
  @Expose()
  public userId?: string;

  @ApiProperty(BlogPostApiProperty.CreatedDate)
  @Expose()
  public createdAt?: Date;

  @ApiProperty(BlogPostApiProperty.UpdatedDate)
  @Expose()
  public updatedAt?: Date;

  @ApiProperty(BlogPostApiProperty.State)
  @Expose()
  public state?: PostState;

  @ApiProperty(BlogPostApiProperty.Type)
  @Expose()
  public type?: PostType;

  @ApiProperty(BlogPostApiProperty.Tags)
  @Expose()
  @Type(() => TagRDO)
  public tags?: TagRDO[];
}

