import type { AtLeastOne } from '@app/shared/types';

export interface EmotionRepositoryCreateInput {
  name: string;
}

export interface EmotionRepositoryUpdateInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
  data: Partial<{ name: string }>;
}

export interface EmotionRepositoryFindUniqueOrThrowInput {
  where: AtLeastOne<{
    id: number;
    uuid: string;
  }>;
}

export interface EmotionRepositoryFindManyInput {
  where?: {
    name?: string;
  };
}
