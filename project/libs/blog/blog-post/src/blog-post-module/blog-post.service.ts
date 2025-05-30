import { Injectable, NotFoundException } from "@nestjs/common";

import { PaginationResult } from "@project/core";
import { BlogTagService } from "@project/blog-tag";
import {
  BlogCommentEntity,
  BlogCommentFactory,
  BlogCommentRepository,
  CreateCommentDTO
} from "@project/blog-comment";

import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostRepository } from "./blog-post.repository";
import { BlogPostMessage } from "./blog-post.constants";
import { CreatePostDTO } from "../dto/create-post.dto";
import { UpdatePostDTO } from "../dto/update-post.dto";
import { BlogPostQuery } from "./blog-post.query";
import { BlogPostFactory } from "./blog-post.factory";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
  ) {}

  private isValidKey(key: string, obj: BlogPostEntity): key is keyof BlogPostEntity {
    return key in obj;
  }

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDTO): Promise<BlogPostEntity> {
    const tags = await this.blogTagService.getTagsByIds(dto.tags as string[]);
    const newPost = BlogPostFactory.createFromCreatePostDTO(dto, tags);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(id: string, dto: UpdatePostDTO): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && this.isValidKey(key, existsPost) && existsPost[key] !== value) {
        existsPost[key] = value as never;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagIds = existsPost.tags.map((tag) => tag.id);
        isSameTags = currentTagIds.length === value.length &&
          currentTagIds.some((tagId) => value.includes(tagId));

        if (!isSameTags) {
          existsPost.tags = await this.blogTagService.getTagsByIds(dto.tags as string[]);
        }
      }
    }

    if (isSameTags && !hasChanges) {
      return existsPost;
    }

    await this.blogPostRepository.update(existsPost);
    return existsPost;
  }

  public async deletePost(id: string): Promise<void> {
    await this.blogPostRepository.deleteById(id);
  }

  public async getPostById(id: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(BlogPostMessage.NotFoundById);
    }

    return post;
  }

  public async getPostByTitle(title: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findPostByTitle(title);
    if (!post) {
      throw new NotFoundException(BlogPostMessage.NotFoundByTitle);
    }

    return post;
  }

  public async addComment(postId: string, dto: CreateCommentDTO): Promise<BlogCommentEntity> {
    const existsPost = await this.getPostById(postId);
    const newComment = this.blogCommentFactory.createFromDTO(dto, existsPost.id as string);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
