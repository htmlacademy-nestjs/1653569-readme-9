import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Comment, PaginationResult } from '@project/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentMessage } from './blog-comment.constants';
import { BlogCommentQuery } from './blog-comment-query';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  private async calculateCommentCount(where: Prisma.CommentWhereInput) {
    return this.client.comment.count({ where });
  }

  private calculateCommentPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: BlogCommentEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.comment.create({
      data: {
        text: pojoEntity.text,
        userId: pojoEntity.userId,
        post: { connect: { id: entity.postId } }
      },
    });

    await this.client.post.update({
      where: { id: entity.postId },
      data: { commentCount: { increment: 1 } }
    });

    entity.id = record.id;
  }

  public override async findById(id: string): Promise<BlogCommentEntity> {
    const comment = await this.client.comment.findFirst({ where: { id } });
    if (!comment) {
      throw new NotFoundException(BlogCommentMessage.OneNotFound);
    }

    return this.createEntityFromDocument(comment);
  }

  public async delete(id: string, postId: string): Promise<void> {
    await this.client.comment.delete({ where: { id } });
    await this.client.post.update({
      where: { id: postId },
      data: { commentCount: { decrement: 1 } }
    });
  }

  public async findByPostId(postId: string, query?: BlogCommentQuery): Promise<PaginationResult<BlogCommentEntity>> {
    const skip = (query?.page && query?.limit) ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = { postId };
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};
    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection
    }

    const [records, commentsCount] = await Promise.all([
      this.client.comment.findMany({ where, skip, take, orderBy }),
      this.calculateCommentCount(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateCommentPage(commentsCount, take as number),
      itemsPerPage: take as number,
      totalItems: commentsCount
    }
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    const { entities } = await this.findByPostId(postId);
    await Promise.all(entities.map((entity) => this.delete(entity.id as string, postId)));
  }
}
