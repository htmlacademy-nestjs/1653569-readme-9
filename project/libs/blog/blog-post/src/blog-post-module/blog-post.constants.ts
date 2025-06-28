import { HttpStatus } from "@nestjs/common";

import { PostStatus, SortDirection, SortType } from "@project/core";
import { BlogPostApiProperty } from "./blog-post.property";
import { BlogPostRDO } from "../rdo/blog-post.rdo";
import { BlogPostWithPaginationRDO } from "../rdo/blog-post-with-pagination.rdo";

export const BlogPostMessage = {
  Found: 'Post found',
  FoundAll: 'Posts found',
  NotFound: 'Post not found',
  NotFoundById: 'Post with this postID not found',
  NotFoundByTitle: 'Post with this title not found',
  AccessDeny: "You can't modify post you are not created",
  RepostSelf: "You can't repost your own post",
  RepostExists: 'You already repost this post',
  Like: 'Successfully add new like',
  Unlike: 'Successfully remove new like',
  NotAllowed: 'You are not allowed to change or delete this post',
  Unauthorized: "User is unauthorized",
} as const

export const BlogPostApiOperation = {
  FindAll: { summary: "Find all posts" },
  FindById: { summary: "Find post by ID" },
  FindByTitle: { summary: "Find post by title" },
  Create: { summary: "Create post" },
  Update: { summary: "Update post by ID" },
  Delete: { summary: "Delete post by ID" },
  Repost: { summary: "Repost post" },
} as const;

export const BlogPostApiOption = {
  ParamPostId: {
    name: 'id',
    schema: BlogPostApiProperty.Id
  },
  QueryTitle: {
    name: 'title',
    schema: BlogPostApiProperty.Title
  }
} as const;

export const BlogPostApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'New post was created',
    type: BlogPostRDO,
  },
  Updated: {
    status: HttpStatus.OK,
    description: 'Post was updated',
    type: BlogPostRDO,
  },
  Found: {
    status: HttpStatus.OK,
    description: 'Post was found',
    type: BlogPostRDO,
  },
  FoundAll: {
    status: HttpStatus.OK,
    description: BlogPostMessage.FoundAll,
    type: BlogPostWithPaginationRDO,
  },
  NotFoundById: {
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.NotFoundById
  },
  NotFoundByTitle: {
    status: HttpStatus.NOT_FOUND,
    description: BlogPostMessage.NotFoundByTitle
  },
  Deleted: {
    status: HttpStatus.NO_CONTENT,
    description: 'Post was deleted',
  },
  NotAllowed: {
    status: HttpStatus.CONFLICT,
    description: BlogPostMessage.NotAllowed
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostMessage.Unauthorized
  },
  Like: {
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.Like
  },
  Unlike: {
    status: HttpStatus.NO_CONTENT,
    description: BlogPostMessage.Unlike
  },
} as const;

export const BlogPostLimit = {
  Title: {
    Min: 20,
    Max: 50,
  },
  Text: {
    Min: 100,
    Max: 1024,
  },
  Description: {
    Min: 50,
    Max: 255,
  },
  Announcement: {
    Min: 50,
    Max: 255,
  },
  DescriptionLink: {
    Min: 0,
    Max: 300,
  },
  Quote: {
    Min: 20,
    Max: 300,
  },
  Author: {
    Min: 3,
    Max: 50,
  },
  Tag: {
    Min: 3,
    Max: 10,
  },
  Tags: {
    Min: 0,
    Max: 8,
  },
  Pages: {
    Max: 20,
  }
} as const;

export const BlogPostQueryDefaults = {
  Limit: 25,
  Page: 1,
  SortDirection: SortDirection.Desc,
  SortType: SortType.CreatedAt,
  PostStatus: PostStatus.Published,
} as const;
