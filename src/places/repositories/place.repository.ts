import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { PlaceRepositoryContract } from '@app/places/contracts';
import type {
  PlaceRepositoryCreateInput,
  PlaceRepositoryFindUniqueOrThrowInput,
  PlaceRepositoryUpdateInput,
} from '@app/places/dtos';
import { Place } from '@app/places/entities/place.entity';
import { Injectable } from '@nestjs/common';
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
}
