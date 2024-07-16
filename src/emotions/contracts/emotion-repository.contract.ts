import type {
  EmotionRepositoryCreateInput,
  EmotionRepositoryFindManyInput,
  EmotionRepositoryFindUniqueOrThrowInput,
  EmotionRepositoryUpdateInput,
} from '@app/emotions/dtos/emotion-repository-dtos';
import type { Emotion } from '@app/emotions/entities/emotion.entity';

abstract class EmotionRepositoryContract {
  public abstract create(input: EmotionRepositoryCreateInput): Promise<Emotion>;

  public abstract update(input: EmotionRepositoryUpdateInput): Promise<Emotion>;

  public abstract findUniqueOrThrow(input: EmotionRepositoryFindUniqueOrThrowInput): Promise<Emotion>;

  public abstract findMany(input?: EmotionRepositoryFindManyInput): Promise<Emotion[]>;
}

export { EmotionRepositoryContract };
