import { HttpStatus } from "@nestjs/common";
import { BlogTagApiProperty } from "./blog-tag.property";
import { TagRDO } from "../rdo/tag.rdo";

export const BlogTagMessage = {
  OneNotFound: 'Tag not found',
  ManyNotFound: 'Tags not found',
} as const

export const BlogTagApiOperation = {
  FindAll: { summary: "Find all tags" },
  FindById: { summary: "Find tag by ID" },
  FindByTitle: { summary: "Find tag by title" },
  Create: { summary: "Create new tag" },
} as const;

export const BlogTagApiParam = {
  Id: {
    name: 'id',
    schema: BlogTagApiProperty.Id
  },
} as const;

export const BlogTagApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'New tag was created',
    type: TagRDO,
  },
  Found: {
    status: HttpStatus.OK,
    description: 'Tag was found',
    type: TagRDO,
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: BlogTagMessage.OneNotFound
  },
  Conflict: {
    status: HttpStatus.CONFLICT,
    description: 'Tag title already exists'
  },
} as const;

export const BlogTagLimit = {
  Title: {
    Min: 3,
    Max: 10,
  }
} as const;
