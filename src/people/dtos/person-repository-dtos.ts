import type { Paginate } from '@app/lib/prisma/interfaces';
import type { AtLeastOne } from '@app/shared/types';

export interface PersonRepositoryCreateInput {
  name: string;
  userId: number;
}

export interface PersonRepositoryUpdateInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ name: string }>;
}

export interface PersonRepositoryFindUniqueOrThrowInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}

export interface PersonRepositoryFindManyPaginatedInput {
  where: {
    name?: string;
    userId: number;
  };
  options?: Paginate;
}

export interface PersonRepositoryDeleteInput {
  where: { userId: number } & AtLeastOne<{
    id?: number;
    uuid?: string;
  }>;
}
