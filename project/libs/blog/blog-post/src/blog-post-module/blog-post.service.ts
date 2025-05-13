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
    return await this.blogPostRepository.findPosts();
  }

  public async createPost(dto: CreatePostDTO): Promise<BlogPostEntity> {
    const postEntity = new BlogPostEntity(dto);
    await this.blogPostRepository.save(postEntity);
    return postEntity;
  }

  public async updatePostById(id: string, dto: UpdatePostDTO): Promise<BlogPostEntity> {
    const post = await this.blogPostRepository.updatePost(id, dto);
    if (!post) {
      throw new NotFoundException(BlogPostMessage.NotFoundById);
    }

    await this.blogPostRepository.save(post);
    return post;
  }

  public async deletePostById(id: string): Promise<void> {
    await this.findPostById(id);
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
