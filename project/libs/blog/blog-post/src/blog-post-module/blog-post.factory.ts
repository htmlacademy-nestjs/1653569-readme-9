import { Injectable } from '@nestjs/common';

import { Post, EntityFactory } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDTO } from '../dto/create-post.dto';
import { BlogTagEntity } from '@project/blog-tag';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createPost(dto: CreatePostDTO, tags: BlogTagEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.userId = dto.userId;
    entity.repostedPostId = dto.repostedPostId;
    entity.repostedUserId = dto.repostedUserId;
    entity.isReposted = dto.isReposted ?? false;
    entity.commentCount = dto.commentCount ?? 0;
    entity.likeCount = dto.likeCount ?? 0;
    entity.status = dto.status;
    entity.type = dto.type;
    entity.tags = tags ?? [];
    entity.video = dto.video ?? undefined;
    entity.photo = dto.photo ?? undefined;
    entity.link = dto.link ?? undefined;
    entity.quote = dto.quote ?? undefined;
    entity.text = dto.text ?? undefined;

    return entity;
  }

  public static createRepost(existsPost: Post, userId: string): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.userId = userId;
    entity.repostedPostId = existsPost.id;
    entity.repostedUserId = existsPost.userId;
    entity.isReposted = true;
    entity.commentCount = 0;
    entity.likeCount = 0;
    entity.status = existsPost.status;
    entity.type = existsPost.type;
    entity.tags = existsPost.tags ?? [];
    entity.video = existsPost.video ? { title: existsPost.video.title, url: existsPost.video.url } : undefined;
    entity.photo = existsPost.photo ? { path: existsPost.photo.path } : undefined;
    entity.link = existsPost.link ? { url: existsPost.link.url, description: existsPost.link.description } : undefined;
    entity.quote = existsPost.quote ? { author: existsPost.quote.author, text: existsPost.quote.text } : undefined;
    entity.text = existsPost.text ? { title: existsPost.text.title, text: existsPost.text.text, announcement: existsPost.text.announcement } : undefined;

    return entity;
  }
}
