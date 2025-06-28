import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';
import { Tag } from '@project/core';

import { BlogTagEntity } from './blog-tag.entity';
import { BlogTagFactory } from './blog-tag.factory';
import { TagFilter, tagFilterToPrismaFilter } from './blog-tag.filter';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity, Tag> {
  constructor(
    entityFactory: BlogTagFactory,
    override readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public override async save(entity: BlogTagEntity): Promise<void> {
    const tag = await this.client.tag.create({ data: { ...entity.toPOJO() } });
    entity.id = tag.id;
  }

  public async find(filter?: TagFilter): Promise<BlogTagEntity[]> {
    const where = filter && tagFilterToPrismaFilter(filter);
    const tags = await this.client.tag.findMany({ where });

    return tags.map((tag) => this.createEntityFromDocument(tag));
  }

  public override async findById(id: string): Promise<BlogTagEntity> {
    const tag = await this.client.tag.findFirst({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with id '${id}' not found.`);
    }

    return this.createEntityFromDocument(tag);
  }

  public async findByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.client.tag.findMany({ where: { id: { in: ids } } });

    return tags.map((tag) => this.createEntityFromDocument(tag));
  }

  public async findByTitle(title: string): Promise<BlogTagEntity>  {
    const tag = await this.client.tag.findFirst({ where: { title } });
    if (!tag) {
      throw new NotFoundException(`Tag with title '${title}' not found.`);
    }

    return this.createEntityFromDocument(tag);
  }

  public async findByTitles(titles: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.client.tag.findMany({ where: { title: { in: titles } } });
    return tags.map((tag) => this.createEntityFromDocument(tag));
  }

  public async createMany(tags: Tag[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.createManyAndReturn({ data: [ ...tags] });
    return records.map((record) => this.createEntityFromDocument(record));
  }
}
