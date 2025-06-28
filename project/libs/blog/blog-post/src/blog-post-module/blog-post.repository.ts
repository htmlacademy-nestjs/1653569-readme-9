import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { PaginationResult, Post, SortType } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostLimit } from './blog-post.constants';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    entityFactory: BlogPostFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private includeOptions = {
    tags: true,
    video: true,
    link: true,
    quote: true,
    text: true,
    photo: true,
    _count: {
      select: {
        comments: true,
        likes: true,
      }
    }
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
        type: pojoEntity.type,
        status: pojoEntity.status,
        userId: pojoEntity.userId,
        isReposted: pojoEntity.isReposted,
        repostedUserId: pojoEntity.repostedUserId,
        repostedPostId: pojoEntity.repostedPostId,
        likeCount: pojoEntity.likeCount,
        commentCount: pojoEntity.commentCount,
        tags: { connect: pojoEntity.tags.map(({ id }) => ({ id })) },
        comments: { create: [] },
        likes: { create: [] },
        video: entity.video ? { create: { ...entity.video } } : undefined,
        link: entity.link ? { create: { ...entity.link } } : undefined,
        quote: entity.quote ? { create: { ...entity.quote } } : undefined,
        text: entity.text ? { create: { ...entity.text } } : undefined,
        photo: entity.photo ? { create: { ...entity.photo } } : undefined
      },
      include: { tags: true, video: true, link: true, quote: true, text: true, photo: true }
    });

    entity.id = record.id;
  }

  public async find(query?: BlogPostQuery, userIds?: string[]): Promise<PaginationResult<BlogPostEntity>> {
    const skip = (query?.page && query?.limit) ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit as number;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        some: {
          title: { in: query.tags }
        }
      }
    }

    if (query?.search) {
      where.text = {
        title: {
          contains: query.search
        }
      }

      query.limit = query.limit !== undefined
        ? (query.limit > BlogPostLimit.Pages.Max ? BlogPostLimit.Pages.Max : query.limit)
        : BlogPostLimit.Pages.Max;
    }

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.sortBy) {
      switch (query?.sortBy) {
        case SortType.CreatedAt:
          orderBy.createdAt = query.sortDirection;
          break;
        case SortType.Comments:
          orderBy.comments = { _count: query.sortDirection };
          break;
        case SortType.Likes:
          orderBy.likes = { _count: query.sortDirection };
          break;
      }
    }

    if (userIds?.length) {
      where.userId = {
        in: userIds
      }
    }

    const [records, postsCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: this.includeOptions
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record as Post)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postsCount, take),
      itemsPerPage: take,
      totalItems: postsCount
    }
  }

  public override async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: { id },
      include: this.includeOptions
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.createEntityFromDocument(document as Post);
  }

  public async findRepost(repostedPostId: string, userId: string): Promise<BlogPostEntity | null> {
    const document = await this.client.post.findFirst({
      where: { repostedPostId, userId },
      include: this.includeOptions
    });

    return (document) ? this.createEntityFromDocument(document as Post) : null;
  }

  public override async update(entity: BlogPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: {
        id: pojoEntity.id
      },
      data: {
        type: pojoEntity.type,
        status: pojoEntity.status,
        userId: pojoEntity.userId,
        isReposted: pojoEntity.isReposted,
        repostedUserId: pojoEntity.repostedUserId,
        repostedPostId: pojoEntity.repostedPostId,
        likeCount: pojoEntity.likeCount,
        commentCount: pojoEntity.commentCount,
        tags: { connect: pojoEntity.tags.map(({ id }) => ({ id })) },

        video: entity.video ? {
          update: {
            where: { id: entity.video.id },
            data: { title: entity.video.title, url: entity.video.url }
          }
        } : undefined,

        photo: entity.photo ? {
          update: {
            where: { id: entity.photo.id },
            data: { path: entity.photo.path }
          }
        } : undefined,

        quote: entity.quote ? {
          update: {
            where: { id: entity.quote.id },
            data: { author: entity.quote.author, text: entity.quote.text }
          }
        } : undefined,

        link: entity.link ? {
          update: {
            where: { id: entity.link.id },
            data: { url: entity.link.url, description: entity.link.description }
          }
        } : undefined,

        text: entity.text ? {
          update: {
            where: { id: entity.text.id },
            data: {
              title: entity.text.title,
              announcement: entity.text.announcement,
              text: entity.text.text,
            }
          }
        } : undefined
      },
      include: this.includeOptions
    });
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({ where: { id } });
    await this.client.comment.deleteMany({ where: { postId: id } });
  }
}
