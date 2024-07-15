import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import type { RecordRepositoryContract } from '@app/records/contracts';
import type {
  RecordRepositoryCreateInput,
  RecordRepositoryFindUniqueOrThrowInput,
  RecordRepositoryUpdateInput,
} from '@app/records/dtos';
import { Record } from '@app/records/entities/record.entity';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecordRepository implements RecordRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: RecordRepositoryFindUniqueOrThrowInput) {
    const record = await this.prismaManager.getClient().record.findUniqueOrThrow({
      where: input.where,
    });

    return new Record(record);
  }

  public async create(input: RecordRepositoryCreateInput) {
    const record = await this.prismaManager.getClient().record.create({
      data: {
        ...input,
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
}
