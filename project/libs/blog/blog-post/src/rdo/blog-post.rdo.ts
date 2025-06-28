import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostStatus, PostType } from '@project/core';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';
import { BlogVideoPostRDO } from './blog-video-post.rdo';
import { BlogQuotePostRDO } from './blog-quote-post.rdo';
import { BlogLinkPostRDO } from './blog-link-post.rdo';
import { BlogPhotoPostRDO } from './blog-photo-post.rdo';
import { BlogTextPostRDO } from './blog-text-post.rdo';
import { TagRDO } from '@project/blog-tag';

export class BlogPostRDO {
  @ApiProperty(BlogPostApiProperty.Id)
  @Expose()
  public id!: string;

  @ApiProperty(BlogPostApiProperty.Type)
  @Expose()
  public type!: PostType;

  @ApiProperty(BlogPostApiProperty.Status)
  @Expose()
  public status!: PostStatus;

  @ApiProperty(BlogPostApiProperty.PostedDate)
  @Expose()
  public postedAt!: Date;

  @ApiProperty(BlogPostApiProperty.CreatedDate)
  @Expose()
  public createdAt!: Date;

  @ApiProperty(BlogPostApiProperty.UpdatedDate)
  @Expose()
  public updatedAt!: Date;

  @ApiProperty(BlogPostApiProperty.Tags)
  @Transform((params) => Array.isArray(params.value) ? params.value.map((tag) => tag.title) : [])
  @Type(() => TagRDO)
  @Expose()
  public tags?: TagRDO[];

  @ApiProperty(BlogPostApiProperty.UserId)
  @Expose()
  public userId!: string;

  @ApiProperty(BlogPostApiProperty.Boolean)
  @Expose()
  public isReposted!: boolean;

  @ApiProperty(BlogPostApiProperty.RepostPostId)
  @Expose()
  public repostedPostId!: string;

  @ApiProperty(BlogPostApiProperty.RepostUserId)
  @Expose()
  public repostedUserId!: string;

  @ApiProperty(BlogPostApiProperty.CommentCount)
  @Expose()
  public commentCount!: number;

  @ApiProperty(BlogPostApiProperty.LikeCount)
  @Expose()
  public likeCount!: number;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Type(() => BlogVideoPostRDO)
  @Expose()
  public video?: BlogVideoPostRDO;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Type(() => BlogQuotePostRDO)
  @Expose()
  public quote?: BlogQuotePostRDO;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Type(() => BlogLinkPostRDO)
  @Expose()
  public link?: BlogLinkPostRDO;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Type(() => BlogPhotoPostRDO)
  @Expose()
  public photo?: BlogPhotoPostRDO;

  @ApiProperty(BlogPostApiProperty.UserId)
  @Type(() => BlogTextPostRDO)
  @Expose()
  public text?: BlogTextPostRDO;
}
