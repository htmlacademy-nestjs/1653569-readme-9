import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/core';
import { BlogTagEntity } from '@project/blog-tag'
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDTO } from '../dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDTO(dto: CreatePostDTO, tags: BlogTagEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.title = dto.title;
    entity.text = dto.text;
    entity.announcement = dto.announcement;
    entity.description = dto.description;
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.linkPath = dto.linkPath;
    entity.repostedPostId = dto.repostedPostId;
    entity.repostedUserId = dto.repostedUserId;
    entity.isReposted = dto.isReposted;
    entity.commentCount = dto.commentCount;
    entity.likeCount = dto.likeCount;
    entity.comments = [];
    entity.userId = dto.userId;
    entity.state = dto.state;
    entity.tags = tags;
    entity.type = dto.type;

    return entity;
  }
}
