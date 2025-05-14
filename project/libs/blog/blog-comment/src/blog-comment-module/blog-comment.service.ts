import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDTO } from '../dto/create-comment.dto';
import { BlogCommentMessage } from './blog-comment.constants';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  public async getCommentsByPostId(postId: string) {
    const comments = await this.blogCommentRepository.findComments(postId);
    if (!comments) {
      throw new NotFoundException(BlogCommentMessage.SeveralNotFound);
    }

    return comments;
  }

  public async createCommentByPostId(postId: string, dto: CreateCommentDTO): Promise<BlogCommentEntity> {
    const commentEntity = new BlogCommentEntity({ ...dto, postId });
    await this.blogCommentRepository.save(commentEntity);
    return commentEntity;
  }

  public async deleteCommentById(id: string): Promise<void> {
    await this.findCommentById(id);
    await this.blogCommentRepository.deleteById(id);
  }

  public async findCommentById(id: string): Promise<BlogCommentEntity> {
    const comment = await this.blogCommentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(BlogCommentMessage.OneNotFound);
    }

    return comment;
  }
}
