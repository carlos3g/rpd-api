import { createPaginator, type PaginatedResult } from '@app/lib/prisma/helpers/pagination';
import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { PersonRepositoryContract } from '@app/people/contracts';
import type {
  PersonRepositoryCreateInput,
  PersonRepositoryDeleteInput,
  PersonRepositoryFindUniqueOrThrowInput,
  PersonRepositoryUpdateInput,
} from '@app/people/dtos/person-repository-dtos';
import { Person } from '@app/people/entities/person.entity';
import type { PlaceRepositoryFindManyPaginatedInput } from '@app/places/dtos/place-repository-dtos';
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonRepository implements PersonRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: PersonRepositoryFindUniqueOrThrowInput) {
    const person = await this.prismaManager.getClient().person.findUniqueOrThrow({
      where: input.where,
    });

    return new Person(person);
  }

  public findManyPaginated(input: PlaceRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Person>> {
    const { name, ...where } = input.where;
    const { perPage = 20, page = 1 } = input.options || {};

    const paginate = createPaginator({ perPage });

    return paginate<Person, Prisma.PersonFindManyArgs>(
      this.prismaManager.getClient().person,
      {
        where: {
          ...where,
          name: { mode: 'insensitive', contains: name },
        },
        orderBy: { createdAt: 'desc' },
      },
      { page }
    );
  }

  public async create(input: PersonRepositoryCreateInput) {
    const person = await this.prismaManager.getClient().person.create({
      data: {
        ...input,
        uuid: uuidv4(),
      },
    });

    return new Person(person);
  }

  public async update(input: PersonRepositoryUpdateInput) {
    const person = await this.prismaManager.getClient().person.update({
      where: input.where,
      data: input.data,
    });

    return new Person(person);
  }

  public async delete(input: PersonRepositoryDeleteInput): Promise<void> {
    const { where } = input;

    await this.prismaManager.getClient().person.delete({ where });
  }
}
