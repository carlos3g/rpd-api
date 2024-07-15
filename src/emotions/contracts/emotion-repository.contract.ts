import type {
  EmotionRepositoryCreateInput,
  EmotionRepositoryFindUniqueOrThrowInput,
  EmotionRepositoryUpdateInput,
} from '@app/emotions/dtos';
import type { Emotion } from '@app/emotions/entities/emotion.entity';

abstract class EmotionRepositoryContract {
  public abstract create(input: EmotionRepositoryCreateInput): Promise<Emotion>;

  public abstract update(input: EmotionRepositoryUpdateInput): Promise<Emotion>;

  public abstract findUniqueOrThrow(input: EmotionRepositoryFindUniqueOrThrowInput): Promise<Emotion>;
}

export { EmotionRepositoryContract };
