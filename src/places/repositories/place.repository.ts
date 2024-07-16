import { createPaginator, type PaginatedResult } from '@app/lib/prisma/helpers';
import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { PlaceRepositoryContract } from '@app/places/contracts';
import type {
  PlaceRepositoryCreateInput,
  PlaceRepositoryDeleteInput,
  PlaceRepositoryFindManyPaginatedInput,
  PlaceRepositoryFindUniqueOrThrowInput,
  PlaceRepositoryUpdateInput,
} from '@app/places/dtos/place-repository-dtos';
import { Place } from '@app/places/entities/place.entity';
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlaceRepository implements PlaceRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: PlaceRepositoryFindUniqueOrThrowInput) {
    const place = await this.prismaManager.getClient().place.findUniqueOrThrow({
      where: input.where,
    });

    return new Place(place);
  }

  public async findManyPaginated(input: PlaceRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Place>> {
    const { name, ...where } = input.where;
    const { perPage = 20, page = 1 } = input.options || {};

    const paginate = createPaginator({ perPage });

    const result = await paginate<Place, Prisma.PlaceFindManyArgs>(
      this.prismaManager.getClient().place,
      {
        where: {
          ...where,
          name: { mode: 'insensitive', contains: name },
        },
        orderBy: { createdAt: 'desc' },
      },
      { page }
    );

    return { ...result, data: result.data.map((item) => new Place(item)) };
  }

  public async create(input: PlaceRepositoryCreateInput) {
    const place = await this.prismaManager.getClient().place.create({
      data: {
        ...input,
        uuid: uuidv4(),
      },
    });

    return new Place(place);
  }

  public async update(input: PlaceRepositoryUpdateInput) {
    const place = await this.prismaManager.getClient().place.update({
      where: input.where,
      data: input.data,
    });

    return new Place(place);
  }

  public delete(input: PlaceRepositoryDeleteInput): Promise<Place> {
    const { where } = input;

    return this.prismaManager.getClient().place.delete({ where });
  }
}
