import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Like } from '@project/core';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';
import { BlogLikeMessage } from './blog-like.constants';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<BlogLikeEntity, Like> {
  constructor (
    entityFactory: BlogLikeFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async createLikeByPostId(postId: string, userId: string): Promise<BlogLikeEntity> {
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

  public async deleteLikeByPostId(postId: string, userId: string): Promise<void> {
    const existLike = await this.findLike(postId, userId);
    if (!existLike) {
      throw new NotFoundException(BlogLikeMessage.NotFound);
    }

    await this.client.like.delete({ where: { id: existLike.id, } });
    await this.client.post.update({
      where: { id: postId },
      data: { likeCount: { decrement: 1 } }
    });
  }

  public async findLike(postId: string, userId: string): Promise<Like | null> {
    return await this.client.like.findFirst({ where: { userId, postId } });
  }
}
