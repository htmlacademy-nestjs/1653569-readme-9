import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType, Tag } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class UpdatePostDTO {
  @ApiProperty(BlogPostApiProperty.Id)
  public id!: string;

  @ApiProperty(BlogPostApiProperty.Title)
  public title?: string;

  @ApiProperty(BlogPostApiProperty.Text)
  public text?: string;

  @ApiProperty(BlogPostApiProperty.Announcement)
  public announcement?: string;

  @ApiProperty(BlogPostApiProperty.Description)
  public description?: string;

  @ApiProperty(BlogPostApiProperty.LinkPath)
  public linkPath?: string;

  @ApiProperty(BlogPostApiProperty.RepostPostId)
  public repostPostId?: string;

  @ApiProperty(BlogPostApiProperty.RepostUserId)
  public repostUserId?: string;

  @ApiProperty(BlogPostApiProperty.IsReposted)
  public isReposted!: boolean;

  @ApiProperty(BlogPostApiProperty.CommentCount)
  public commentCount?: number;

  @ApiProperty(BlogPostApiProperty.LikeCount)
  public likeCount?: number;

  @ApiProperty(BlogPostApiProperty.UserId)
  public userId!: string;

  @ApiProperty(BlogPostApiProperty.State)
  public state!: PostState;

  @ApiProperty(BlogPostApiProperty.Tags)
  public tags?: Tag[];

  @ApiProperty(BlogPostApiProperty.Type)
  public type!: PostType;
}

