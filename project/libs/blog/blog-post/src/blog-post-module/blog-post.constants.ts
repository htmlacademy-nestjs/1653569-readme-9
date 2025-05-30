import { HttpStatus } from "@nestjs/common";

import { BlogPostApiProperty } from "./blog-post.property";
import { PostRDO } from "../rdo/post.rdo";
import { SortDirection } from "@project/core";

export const BlogPostMessage = {
  NotFoundById: 'Post with this postID not found',
  NotFoundByTitle: 'Post with this title not found',
} as const


export const BlogPostApiOperation = {
  FindAll: { summary: "Find all posts" },
  FindById: { summary: "Find post by ID" },
  FindByTitle: { summary: "Find post by title" },
  Create: { summary: "Create post" },
  Update: { summary: "Update post by ID" },
  Delete: { summary: "Delete post by ID" },
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
    type: PostRDO,
  },
  Updated: {
    status: HttpStatus.OK,
    description: 'Post was updated',
    type: PostRDO,
  },
  Found: {
    status: HttpStatus.OK,
    description: 'Post was found',
    type: PostRDO,
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
  }
} as const;

export const BlogPostValidateLength = {
  Title: {
    Min: 20,
    Max: 50,
  },
  Text: {
    Min: 100,
    Max: 1024,
  },
  Announcement: {
    Min: 50,
    Max: 255,
  },
  Description: {
    Min: 3,
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
} as const;

export const BlogPostDefault = {
  PostCountLimit: 25,
  PageCount: 1,
  SortDirection: SortDirection.Desc,
} as const;
