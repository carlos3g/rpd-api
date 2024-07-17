import type { PaginatedResult } from '@app/lib/prisma/helpers/pagination';
import { createPaginator } from '@app/lib/prisma/helpers/pagination';
import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { RecordRepositoryContract } from '@app/records/contracts';
import type {
  RecordRepositoryCreateInput,
  RecordRepositoryDeleteInput,
  RecordRepositoryFindManyPaginatedInput,
  RecordRepositoryFindUniqueOrThrowInput,
  RecordRepositoryUpdateInput,
} from '@app/records/dtos/record-repository-dtos';
import { Record } from '@app/records/entities/record.entity';
import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaRecordRepository implements RecordRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: RecordRepositoryFindUniqueOrThrowInput) {
    const record = await this.prismaManager.getClient().record.findUniqueOrThrow({
      where: input.where,
    });

    return new Record(record);
  }

  public async findManyPaginated(input: RecordRepositoryFindManyPaginatedInput): Promise<PaginatedResult<Record>> {
    const { behavior, thought, event, personId, ...where } = input.where;
    const { perPage = 20, page = 1 } = input.options || {};

    const paginate = createPaginator({ perPage });

    const result = await paginate<Record, Prisma.RecordFindManyArgs>(
      this.prismaManager.getClient().record,
      {
        where: {
          ...where,
          people: personId ? { some: { id: personId } } : undefined,
          behavior: { mode: 'insensitive', contains: behavior },
          thought: { mode: 'insensitive', contains: thought },
          event: { mode: 'insensitive', contains: event },
        },
        orderBy: { createdAt: 'desc' },
      },
      { page }
    );

    return { ...result, data: result.data.map((record) => new Record(record)) };
  }

  public async create(input: RecordRepositoryCreateInput) {
    const { personId, ...rest } = input;

    const record = await this.prismaManager.getClient().record.create({
      data: {
        ...rest,
        people: personId
          ? {
              connect: { id: personId },
            }
          : undefined,
        uuid: uuidv4(),
      },
    });

    return new Record(record);
  }

  public async update(input: RecordRepositoryUpdateInput) {
    const record = await this.prismaManager.getClient().record.update({
      where: input.where,
      data: input.data,
    });

    return new Record(record);
  }

  public async delete(input: RecordRepositoryDeleteInput): Promise<void> {
    const { where } = input;

    await this.prismaManager.getClient().record.delete({ where });
  }
}
