import type {
  PersonRepositoryCreateInput,
  PersonRepositoryFindUniqueOrThrowInput,
  PersonRepositoryUpdateInput,
} from '@app/people/dtos';
import type { Person } from '@app/people/entities/person.entity';

abstract class PersonRepositoryContract {
  public abstract create(input: PersonRepositoryCreateInput): Promise<Person>;

  public abstract update(input: PersonRepositoryUpdateInput): Promise<Person>;

  public abstract findUniqueOrThrow(input: PersonRepositoryFindUniqueOrThrowInput): Promise<Person>;
}

export { PersonRepositoryContract };
