import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult } from '@project/core';
import { BlogPostService } from '@project/blog-post';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentQuery } from './blog-comment-query';
import { CreateCommentDTO } from '../dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(
    private blogCommentFactory: BlogCommentFactory,
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService
  ) { }

  public async getComments(postId: string, query: BlogCommentQuery): Promise<PaginationResult<ReturnType<BlogCommentEntity['toPOJO']>>> {
    const existPost = await this.blogPostService.getPost(postId);
    if (!existPost) {
      throw new NotFoundException(`Post with id: ${postId} not found`);
    }

    const commentsWithPagination = await this.blogCommentRepository.findByPostId(postId, query);
    const comments = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) => comment.toPOJO())
    };

    return comments;
  }

  public async createComment(dto: CreateCommentDTO, postId: string): Promise<BlogCommentEntity> {
    const existPost = await this.blogPostService.getPost(postId);
    if (!existPost) {
      throw new NotFoundException(`Post with id: ${postId} not found`);
    }

    const newComment = this.blogCommentFactory.createFromDTO(dto, postId);
    await this.blogCommentRepository.save(newComment);
    return newComment;
  }

  public async deleteComment(id: string, userId: string): Promise<void> {
    if (!userId) {
      throw new ConflictException('You cannot delete comment without authorization')
    }

    const existComment = await this.blogCommentRepository.findById(id);
    if (userId !== existComment.userId) {
      throw new ConflictException('You cannot delete another author of comment')
    }

    try {
      await this.blogCommentRepository.delete(existComment.id as string, existComment.postId)
    } catch {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
  }
}
