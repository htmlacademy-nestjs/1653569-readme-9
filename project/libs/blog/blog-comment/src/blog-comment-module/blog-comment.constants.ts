import { HttpStatus } from "@nestjs/common";
import { BlogCommentApiProperty } from "./blog-comment.property";
import { CommentRDO } from "../rdo/comment.rdo";

export const BlogCommentMessage = {
  OneNotFound: 'Comment not found',
  SeveralNotFound: 'Comments for this postID not found',
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
    type: CommentRDO,
  },
  Found: {
    status: HttpStatus.OK,
    description: 'Comment was found',
    type: CommentRDO,
  },
  NotFoundById: {
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentMessage.OneNotFound
  },
  NotFoundByPostId: {
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentMessage.SeveralNotFound
  },
  Deleted: {
    status: HttpStatus.NO_CONTENT,
    description: 'Comment was deleted',
  }
} as const;

export const BlogCommentValidateLength = {
  Text: {
    Min: 10,
    Max: 300,
  }
} as const;
