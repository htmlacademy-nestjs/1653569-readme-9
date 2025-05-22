import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { Comment, PostState, PostType, Tag } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class PostRDO {
  @ApiProperty(BlogPostApiProperty.Id)
  @Expose()
  public id?: string;

  @ApiProperty(BlogPostApiProperty.Title)
  @Expose()
  public title?: string;

  @ApiProperty(BlogPostApiProperty.Text)
  @Expose()
  public text?: string;

  @ApiProperty(BlogPostApiProperty.Announcement)
  @Expose()
  public announcement?: string;

  @ApiProperty(BlogPostApiProperty.LinkPath)
  @Expose()
  public linkPath?: string;

  @ApiProperty(BlogPostApiProperty.Description)
  @Expose()
  public description?: string;

  @ApiProperty(BlogPostApiProperty.Quote)
  @Expose()
  public quote?: string;

  @ApiProperty(BlogPostApiProperty.Author)
  @Expose()
  public author?: string;

  @ApiProperty(BlogPostApiProperty.CreatedDate)
  @Expose()
  public createdAt!: Date;

  @ApiProperty(BlogPostApiProperty.UpdatedDate)
  @Expose()
  public updatedAt!: Date;

  @ApiProperty(BlogPostApiProperty.IsReposted)
  @Expose()
  public isReposted!: boolean;

  @ApiProperty(BlogPostApiProperty.RepostUserId)
  @Expose()
  public repostUserId?: string;

  @ApiProperty(BlogPostApiProperty.RepostPostId)
  @Expose()
  public repostPostId?: string;

  @ApiProperty(BlogPostApiProperty.CommentCount)
  @Expose()
  public commentCount!: number;

  @ApiProperty(BlogPostApiProperty.LikeCount)
  @Expose()
  public likeCount!: number;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Expose()
  public userId!: string;

  @ApiProperty(BlogPostApiProperty.Type)
  @Expose()
  public type!: PostType;

  @ApiProperty(BlogPostApiProperty.State)
  @Expose()
  public state!: PostState;

  @ApiProperty(BlogPostApiProperty.Tags)
  @Expose()
  public tags?: Tag[];

  @Expose()
  public comments?: Comment[];
}

