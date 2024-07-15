import type { AtLeastOne } from '@app/shared/types';

export interface PlaceRepositoryCreateInput {
  name: string;
  userId: number;
}

export interface PlaceRepositoryUpdateInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ name: string }>;
}

export interface PlaceRepositoryFindUniqueOrThrowInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}
