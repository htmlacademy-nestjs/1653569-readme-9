import { Injectable, NotFoundException } from "@nestjs/common";

import { BlogPostEntity } from "./blog-post.entity";
import { BlogPostRepository } from "./blog-post.repository";
import { BlogPostMessage } from "./blog-post.constants";
import { CreatePostDTO } from "../dto/create-post.dto";
import { UpdatePostDTO } from "../dto/update-post.dto";

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getPosts(): Promise<BlogPostEntity[]> {
    return await this.blogPostRepository.find();
  }

  public async createPost(dto: CreatePostDTO): Promise<BlogPostEntity> {
    const postEntity = new BlogPostEntity(dto);
    await this.blogPostRepository.save(postEntity);
    return postEntity;
  }

  public async updatePostById(id: string, dto: UpdatePostDTO): Promise<BlogPostEntity> {
    const updatedEntity = new BlogPostEntity({...dto, id});
    try {
      await this.blogPostRepository.update(updatedEntity);
    } catch {
      throw new NotFoundException(BlogPostMessage.NotFoundById);
    }

    return updatedEntity;
  }

  public async deletePostById(id: string): Promise<void> {
    await this.blogPostRepository.deleteById(id);
  }

  public async findPostById(id: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(BlogPostMessage.NotFoundById);
    }

    return post;
  }

  public async findPostByTitle(title: string): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.findPostByTitle(title);
    if (!post) {
      throw new NotFoundException(BlogPostMessage.NotFoundByTitle);
    }

    return post;
  }
}
