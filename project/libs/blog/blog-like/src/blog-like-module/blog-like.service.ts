import { Injectable } from '@nestjs/common';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { CreateLikeDTO } from 'src/dto/create-like.dto';

@Injectable()
export class BlogLikeService {
  constructor (
    private readonly blogLikeRepository: BlogLikeRepository
  ) {}

  public async createLike(dto: CreateLikeDTO): Promise<BlogLikeEntity> {
    return await this.blogLikeRepository.createLike(dto.postId, dto.userId);
  }

  public async deleteLike(dto: CreateLikeDTO): Promise<void> {
    return this.blogLikeRepository.deleteLike(dto.postId, dto.userId);
  }
}
