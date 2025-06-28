import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/core';
import { BlogTagEntity, BlogTagService } from '@project/blog-tag';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService,
  ) {}

  private isValidKey(key: string, obj: BlogPostEntity): key is keyof BlogPostEntity {
    return key in obj;
  }

  public async getPosts(query?: BlogPostQuery, userIds?: string[]): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query, userIds);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDTO): Promise<BlogPostEntity> {
    let tags: BlogTagEntity[] = [];
    if (dto.tags && dto.tags.length) {
      tags = await this.blogTagService.findOrCreate(dto.tags);
    }

    const newPost = BlogPostFactory.createPost(dto, tags);
    await this.blogPostRepository.save(newPost);
    return newPost;
  }

  public async createRepost(postId: string, userId: string): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const existRepost = await this.blogPostRepository.findRepost(postId, userId);
    if (existRepost) {
      throw new ConflictException(`You had already made this repost`);
    }

    const newPost = BlogPostFactory.createRepost(existsPost.toPOJO(), userId);
    await this.blogPostRepository.save(newPost);
    return newPost;
  }

  public async updatePost(id: string, dto: UpdatePostDTO): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    if (dto.userId !== existsPost.userId) {
      throw new ConflictException(`You are not allowed to update this post`);
    }
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && this.isValidKey(key, existsPost) && existsPost[key] !== value) {
        existsPost[key] = value as never;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagsTitles = existsPost.tags.map((tag) => tag.title);
        isSameTags = currentTagsTitles
          .length === value.length && currentTagsTitles
          .every((title) => value.includes(title));
      }
    }

    if (isSameTags && ! hasChanges) {
      return existsPost
    }

    if (!isSameTags) {
      existsPost.tags = await this.blogTagService
        .findOrCreate([...(dto.tags || []), ...existsPost.tags.map((tag) => tag.title)]);
    }

    await this.blogPostRepository.update(existsPost);
    return existsPost;
  }

  public async deletePost(postId: string, userId: string): Promise<void> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (userId !== existsPost.userId) {
      throw new ConflictException(`You are not allowed to delete this post`);
    }
    try {
      await this.blogPostRepository.deleteById(postId);
    } catch {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
  }
}
