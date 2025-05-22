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

  public async getTagsByTitles(titles: string[]): Promise<BlogTagEntity[]> {
    if (!titles.length) {
      return [];
    }

    const loweredTitles = titles.map((item) => item.toLocaleLowerCase());
    const uniqueTitles = Array.from(new Set(loweredTitles));
    const foundTagTitles = await this.blogTagRepository.findByTitles(loweredTitles);

    if (uniqueTitles.length !== foundTagTitles.length) {
      const existsTagsTitles = foundTagTitles.map((tag) => tag.title);
      foundTagTitles
        .filter((tag) => !existsTagsTitles.includes(tag.title))
        .forEach(async (title) => await this.createTag(title))
    }

    return foundTagTitles;
  }
}
