import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { BlogTagEntity } from './blog-tag.entity';
import { BlogTagRepository } from './blog-tag.repository';
import { CreateTagDTO } from '../dto/create-tag.dto';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository,
  ) {}

  public async createTag(dto: CreateTagDTO): Promise<BlogTagEntity> {
    const tranformedDTO = { title: dto.title.toLocaleLowerCase() };
    const existsTag = (await this.blogTagRepository.find(tranformedDTO)).at(0);
    if (existsTag) {
      throw new ConflictException(`A tag with the title '${existsTag.title}' already exists`);
    }

    const newTag = new BlogTagEntity(tranformedDTO);
    await this.blogTagRepository.save(newTag);
    return newTag;
  }

  public async getAllTags(): Promise<BlogTagEntity[]> {
    return await this.blogTagRepository.find();
  }

  public async getTagById(id: string): Promise<BlogTagEntity> {
    return this.blogTagRepository.findById(id);
  }

  public async getTagsByIds(tagIds: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.findByIds(tagIds);
    if (tags.length !== tagIds.length) {
      const foundTagsIds = tags.map((tag) => tag.id);
      const notFoundTagIds = tagIds.filter((tagId) => !foundTagsIds.includes(tagId));

      if (!notFoundTagIds.length) {
        throw new NotFoundException(`Tags with ids '${notFoundTagIds.join(', ')}' not found.`);
      }
    }

    return tags;
  }

  public async getTagByTitle(title: string): Promise<BlogTagEntity> {
    return await this.blogTagRepository.findByTitle(title.toLocaleLowerCase());
  }

  public async findOrCreate(dtos: string[]): Promise<BlogTagEntity[]> {
    const titles = dtos.map((title) => title);
    const tags = await this.blogTagRepository.findByTitles(titles);
    if (tags.length !== titles.length) {
      const foundTags = tags.map((tag) => tag.title);
      const notFoundTags = titles.filter((title) => !foundTags.includes(title));

      if (notFoundTags.length) {
        const newTitles = notFoundTags.map((title) => ({title}));
        const documents = await this.blogTagRepository.createMany(newTitles);
        return [...tags, ...documents];
      }
    }

    return tags;
  }

  public async getTagsByTitles(titles: string[]): Promise<BlogTagEntity[]> {
    const tags = await this.blogTagRepository.findByTitles(titles);
    if (tags.length !== titles.length) {
      const foundTags = tags.map((tag) => tag.id);
      const notFoundTags = titles.filter((id) => !foundTags.includes(id));

      if (notFoundTags.length) {
        throw new NotFoundException(`Tags with ids ${notFoundTags} not found.`);
      }
    }

    return tags;
  }
}
