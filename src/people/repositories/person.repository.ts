import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { PersonRepositoryContract } from '@app/people/contracts';
import type {
  PersonRepositoryCreateInput,
  PersonRepositoryFindUniqueOrThrowInput,
  PersonRepositoryUpdateInput,
} from '@app/people/dtos';
import { Person } from '@app/people/entities/person.entity';
import { Injectable } from '@nestjs/common';
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
}
