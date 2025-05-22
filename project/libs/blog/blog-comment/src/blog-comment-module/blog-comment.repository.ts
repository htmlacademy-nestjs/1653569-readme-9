import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Comment } from '@project/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentMessage, BlogCommentValidateLength } from './blog-comment.constants';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity, Comment> {
  constructor(
    entityFactory: BlogCommentFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async find(postId: string): Promise<BlogCommentEntity[]> {
    const comments = await this.client.comment.findMany({
      where: { postId },
      take: BlogCommentValidateLength.Comment.Max,
    });

    if (!comments.length) {
        throw new NotFoundException(BlogCommentMessage.SeveralNotFound);
    }

    return comments.map((comment) => this.createEntityFromDocument(comment));
  }

  public override async save(entity: BlogCommentEntity): Promise<void> {
    const comment = await this.client.comment.create({ data: { ...entity.toPOJO() } });
    entity.id = comment.id;
  }

  public override async findById(id: string): Promise<BlogCommentEntity> {
    const comment = await this.client.comment.findFirst({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(comment);
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({ where: { id } });
  }
}
