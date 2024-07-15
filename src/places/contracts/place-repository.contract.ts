import type {
  PlaceRepositoryCreateInput,
  PlaceRepositoryFindUniqueOrThrowInput,
  PlaceRepositoryUpdateInput,
} from '@app/places/dtos';
import type { Place } from '@app/places/entities/place.entity';

abstract class PlaceRepositoryContract {
  public abstract create(input: PlaceRepositoryCreateInput): Promise<Place>;

  public abstract update(input: PlaceRepositoryUpdateInput): Promise<Place>;

  public abstract findUniqueOrThrow(input: PlaceRepositoryFindUniqueOrThrowInput): Promise<Place>;
}

export { PlaceRepositoryContract };
