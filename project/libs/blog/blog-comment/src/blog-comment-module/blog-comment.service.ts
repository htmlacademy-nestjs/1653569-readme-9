import { Injectable } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  public async getComments(postId: string) {
    return await this.blogCommentRepository.findByPostId(postId);;
  }

  public async deleteComment(id: string): Promise<void> {
    await this.getComment(id);
    await this.blogCommentRepository.deleteById(id);
  }

  public async getComment(id: string): Promise<BlogCommentEntity> {
    return await this.blogCommentRepository.findById(id);
  }
}
