import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType, Tag } from '@project/core';
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

  @ApiProperty(BlogPostApiProperty.CreatedDate)
  @Expose({ name: 'createdAt' })
  public createdDate!: Date;

  @ApiProperty(BlogPostApiProperty.UpdatedDate)
  @Expose({ name: 'updatedAt' })
  public publishDate!: Date;

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
}

