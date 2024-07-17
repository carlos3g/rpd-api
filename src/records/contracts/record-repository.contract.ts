import type { PaginatedResult } from '@app/lib/prisma/helpers/pagination';
import type {
  RecordRepositoryCreateInput,
  RecordRepositoryDeleteInput,
  RecordRepositoryFindManyPaginatedInput,
  RecordRepositoryFindUniqueOrThrowInput,
  RecordRepositoryUpdateInput,
} from '@app/records/dtos/record-repository-dtos';
import type { Record } from '@app/records/entities/record.entity';

abstract class RecordRepositoryContract {
  public abstract create(input: RecordRepositoryCreateInput): Promise<Record>;

  public abstract update(input: RecordRepositoryUpdateInput): Promise<Record>;

  public abstract findUniqueOrThrow(input: RecordRepositoryFindUniqueOrThrowInput): Promise<Record>;

  public abstract findManyPaginated(input: RecordRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Record>>;

  public abstract delete(input: RecordRepositoryDeleteInput): Promise<void>;
}

export { RecordRepositoryContract };
