import type { PaginatedResult } from '@app/lib/prisma/helpers/pagination';
import type {
  PlaceRepositoryCreateInput,
  PlaceRepositoryDeleteInput,
  PlaceRepositoryFindManyPaginatedInput,
  PlaceRepositoryFindUniqueOrThrowInput,
  PlaceRepositoryUpdateInput,
} from '@app/places/dtos/place-repository-dtos';
import type { Place } from '@app/places/entities/place.entity';

abstract class PlaceRepositoryContract {
  public abstract create(input: PlaceRepositoryCreateInput): Promise<Place>;

  public abstract update(input: PlaceRepositoryUpdateInput): Promise<Place>;

  public abstract findUniqueOrThrow(input: PlaceRepositoryFindUniqueOrThrowInput): Promise<Place>;

  public abstract findManyPaginated(input: PlaceRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Place>>;

  public abstract delete(input: PlaceRepositoryDeleteInput): Promise<void>;
}

export { PlaceRepositoryContract };
