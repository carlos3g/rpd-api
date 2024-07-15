import type { AtLeastOne } from '@app/shared/types';

export interface RecordRepositoryCreateInput {
  event: string;
  thought: string;
  behavior: string;
  userId: number;
  placeId: number;
}

export interface RecordRepositoryUpdateInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ event: string; thought: string; behavior: string; userId: number; placeId: number }>;
}

export interface RecordRepositoryFindUniqueOrThrowInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}
