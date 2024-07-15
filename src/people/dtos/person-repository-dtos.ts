import type { AtLeastOne } from '@app/shared/types';

export interface PersonRepositoryCreateInput {
  name: string;
  userId: number;
}

export interface PersonRepositoryUpdateInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ name: string }>;
}

export interface PersonRepositoryFindUniqueOrThrowInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}
