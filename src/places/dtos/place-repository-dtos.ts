import type { Paginate } from '@app/shared/dtos/paginate';
import type { AtLeastOne } from '@app/shared/types';

export interface PlaceRepositoryCreateInput {
  name: string;
  userId: number;
}

export interface PlaceRepositoryUpdateInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ name: string }>;
}

export interface PlaceRepositoryFindUniqueOrThrowInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}

export interface PlaceRepositoryFindManyPaginatedInput {
  where: {
    name?: string;
    userId: number;
  };
  options?: Paginate;
}

export interface PlaceRepositoryDeleteInput {
  where: { userId: number } & AtLeastOne<{
    id?: number;
    uuid?: string;
  }>;
}
