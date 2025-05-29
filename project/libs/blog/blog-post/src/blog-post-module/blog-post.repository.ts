import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { PaginationResult, Post } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';

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

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public override async save(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        comments: { connect: []},
        tags: { connect: pojoEntity.tags.map(({ id }) => ({ id })) },
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
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        text: pojoEntity.text,
        announcement: pojoEntity.announcement,
        description: pojoEntity.description,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        linkPath: pojoEntity.linkPath,
        repostedUserId: pojoEntity.repostedUserId,
        repostedPostId: pojoEntity.repostedPostId,
        isReposted: pojoEntity.isReposted,
        commentCount: pojoEntity.commentCount,
        likeCount: pojoEntity.likeCount,
        userId: pojoEntity.userId,
        state: pojoEntity.state,
        type: pojoEntity.type,
        comments: { connect: []},
        tags: { set: pojoEntity.tags.map((tag) => ({ id: tag.id })) },
      },
      include: this.includeOptions
    });
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = { some: { id: { in: query.tags } } }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [posts, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take, include: this.includeOptions }),
      this.getPostCount(where),
    ]);

    return {
      entities: posts.map((post) => this.createEntityFromDocument(post as Post)),
      currentPage: query?.page as number,
      totalPages: this.calculatePostsPage(postCount, take as number),
      itemsPerPage: take as number,
      totalItems: postCount,
    }
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
