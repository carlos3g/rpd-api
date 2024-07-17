import type { Paginate } from '@app/shared/dtos/paginate';
import type { AtLeastOne } from '@app/shared/types';

export interface RecordRepositoryCreateInput {
  event: string;
  thought: string;
  behavior: string;
  userId: number;
  personId?: number;
  placeId: number;
}

export interface RecordRepositoryUpdateInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ event: string; thought: string; behavior: string; placeId: number }>;
}

export interface RecordRepositoryFindUniqueOrThrowInput {
  where: { userId: number } & AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}

export interface RecordRepositoryFindManyPaginatedInput {
  where: {
    event?: string;
    thought?: string;
    behavior?: string;
    placeId?: number;
    personId?: number;
    userId: number;
  };
  options?: Paginate;
}

export interface RecordRepositoryDeleteInput {
  where: { userId: number } & AtLeastOne<{
    id?: number;
    uuid?: string;
  }>;
}
