import type {
  RecordRepositoryCreateInput,
  RecordRepositoryFindUniqueOrThrowInput,
  RecordRepositoryUpdateInput,
} from '@app/records/dtos';
import type { Record } from '@app/records/entities/record.entity';

abstract class RecordRepositoryContract {
  public abstract create(input: RecordRepositoryCreateInput): Promise<Record>;

  public abstract update(input: RecordRepositoryUpdateInput): Promise<Record>;

  public abstract findUniqueOrThrow(input: RecordRepositoryFindUniqueOrThrowInput): Promise<Record>;
}

export { RecordRepositoryContract };
