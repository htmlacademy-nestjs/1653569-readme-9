import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Post } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private includeOptions = {
    comments: true,
    tags: true,
  };

  public override async save(entity: BlogPostEntity): Promise<void> {
    const record = await this.client.post.create({
      data: {
        ...entity.toPOJO(),
        comments: { connect: []},
        tags: { connect: [] },
      }
    });

    entity.id = record.id;
  }

  public override async findById(id: string): Promise<BlogPostEntity> {
    const post = await this.client.post.findFirst({ where: { id }, include: this.includeOptions });
    if (!post) {
      throw new NotFoundException(`Post with id '${id}' not found.`);
    }

    return this.createEntityFromDocument(post as Post);
  }

  public override async update(entity: BlogPostEntity): Promise<void> {
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        ...entity.toPOJO(),
        comments: { connect: []},
        tags: { connect: [] }
      }
    });
  }

  public async find(): Promise<BlogPostEntity[]>  {
    const posts = await this.client.post.findMany({ include: this.includeOptions });
    return posts.map((post) => this.createEntityFromDocument(post as Post));
  }

  public async findPostByTitle(title: string): Promise<BlogPostEntity> {
    const post = await this.client.post.findFirstOrThrow({ where: { title } });
    if (!post) {
      throw new NotFoundException(`Post with title '${title}' not found`);
    }

    return this.createEntityFromDocument(post as Post);
  }

  public override async deleteById(postId: string): Promise<void> {
    await this.findById(postId);
    await this.client.post.delete({ where: { id: postId } });
  }
}
