import { HttpStatus } from "@nestjs/common";

import { BlogLikeApiProperty } from "./blog-like.property";
import { LikeRDO } from "../rdo/like.rdo";

export const BlogLikeMessage = {
  Exist: 'Like already exists',
  NotFound: 'Like for this postID from current userID not found',
  InvalidId: 'Invalid userID',
  IsNotEmpty: 'Field must not be empty',

} as const

export const BlogLikeApiOperation = {
  Create: { summary: "Create like" },
  Delete: { summary: "Delete like" },
} as const;

export const BlogLikeApiParam = {
  UserId: {
    name: 'id',
    schema: BlogLikeApiProperty.UserId
  },
  PostId: {
    name: 'postId',
    schema: BlogLikeApiProperty.PostId
  },
} as const;

export const BlogLikeApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'New like was created',
    type: LikeRDO,
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeMessage.NotFound,
  },
  Conflict: {
    status: HttpStatus.CONFLICT,
    description: BlogLikeMessage.Exist,
  },
  Deleted: {
    status: HttpStatus.NO_CONTENT,
    description: 'Like was deleted',
  }
} as const;
