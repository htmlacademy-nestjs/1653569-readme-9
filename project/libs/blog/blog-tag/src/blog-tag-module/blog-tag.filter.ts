import { Prisma } from '@prisma/client';

export interface TagFilter {
  id?: string;
  title?: string;
}

export function tagFilterToPrismaFilter(filter: TagFilter): Prisma.TagWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.TagWhereInput = {};

  if (filter.id) {
    prismaFilter = { id: filter.id };
  }

  if (filter.title) {
    prismaFilter = { title: filter.title };
  }

  return prismaFilter;
}
