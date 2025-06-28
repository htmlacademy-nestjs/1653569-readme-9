import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Like } from '@project/core';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';
import { BlogLikeMessage } from './blog-like.constants';
import { Nullable } from '@project/helpers';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor(
    entityFactory: BlogLikeFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async findLike(postId: string, userId: string): Promise<Nullable<Like>> {
    return await this.client.like.findFirst({ where: { userId, postId } });
  }

  public async createLike(postId: string, userId: string): Promise<BlogLikeEntity> {
    const existLike = await this.findLike(postId, userId);
    if (existLike) {
      throw new ConflictException(BlogLikeMessage.Exist);
    }

    const newLike = await this.client.like.create({ data: { userId, postId } });
    await this.client.post.update({
      where: { id: postId },
      data: { likeCount: { increment: 1 } }
    });

    return this.createEntityFromDocument(newLike);
  }

  public async deleteLike(postId: string, userId: string): Promise<void> {
    const existLike = await this.findLike(postId, userId);
    if (!existLike) {
      throw new NotFoundException(BlogLikeMessage.NotFound);
    }

    await this.client.like.delete({ where: { userId_postId: { userId, postId } } });
    await this.client.post.update({
      where: { id: postId },
      data: { likeCount: { decrement: 1 } }
    });
  }
}
