import type { PaginatedResult } from '@app/lib/prisma/helpers/pagination';
import type {
  PersonRepositoryCreateInput,
  PersonRepositoryDeleteInput,
  PersonRepositoryFindManyPaginatedInput,
  PersonRepositoryFindUniqueOrThrowInput,
  PersonRepositoryUpdateInput,
} from '@app/people/dtos/person-repository-dtos';
import type { Person } from '@app/people/entities/person.entity';

abstract class PersonRepositoryContract {
  public abstract create(input: PersonRepositoryCreateInput): Promise<Person>;

  public abstract update(input: PersonRepositoryUpdateInput): Promise<Person>;

  public abstract findUniqueOrThrow(input: PersonRepositoryFindUniqueOrThrowInput): Promise<Person>;

  public abstract findManyPaginated(input: PersonRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Person>>;

  public abstract delete(input: PersonRepositoryDeleteInput): Promise<Person>;
}

export { PersonRepositoryContract };
