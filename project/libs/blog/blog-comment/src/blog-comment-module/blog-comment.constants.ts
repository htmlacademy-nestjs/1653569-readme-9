import { HttpStatus } from "@nestjs/common";
import { BlogCommentApiProperty } from "./blog-comment.property";
import { BlogCommentRDO } from "../rdo/blog-comment.rdo";
import { SortDirection } from "@project/core";

export const BlogCommentMessage = {
  OneNotFound: 'Comment with this ID not found',
  ManyNotFound: 'Comments for this postID not found',
  InvalidId: 'Invalid author ID',
  IsNotEmpty: 'Field must not be empty',
} as const

export const BlogCommentApiOperation = {
  FindAll: { summary: "Find all comments" },
  Create: { summary: "Create comment for post ID" },
  Delete: { summary: "Delete comment by ID" },
} as const;

export const BlogCommentApiParam = {
  Id: {
    name: 'id',
    schema: BlogCommentApiProperty.Id
  },
  PostId: {
    name: 'postId',
    schema: BlogCommentApiProperty.PostId
  },
} as const;

export const BlogCommentApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'New comment was created',
    type: BlogCommentRDO,
  },
  Found: {
    status: HttpStatus.OK,
    description: 'Comment was found',
    type: BlogCommentRDO,
  },
  NotFoundById: {
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentMessage.OneNotFound
  },
  NotFoundByPostId: {
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentMessage.ManyNotFound
  },
  Deleted: {
    status: HttpStatus.NO_CONTENT,
    description: 'Comment was deleted',
  }
} as const;

export const BlogCommentLimit = {
  Text: {
    Min: 10,
    Max: 300,
  },
  Comment: {
    Max: 10,
  }
} as const;

export const BlogCommentQueryDefaults = {
  Limit: 50,
  Page: 1,
  SortDirection: SortDirection.Desc,
} as const;
