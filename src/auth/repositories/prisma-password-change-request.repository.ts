import type { PasswordChangeRequestRepositoryContract } from '@app/auth/contracts';
import type {
  PasswordChangeRequestRepositoryCreateInput,
  PasswordChangeRequestRepositoryDeleteManyInput,
  PasswordChangeRequestRepositoryFindFirstOrThrowInput,
  PasswordChangeRequestRepositoryFindUniqueOrThrowInput,
} from '@app/auth/dtos/password-change-request-repository-dtos';
import { PasswordChangeRequest } from '@app/auth/entities/password-change-request.entity';
import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPasswordChangeRequestRepository implements PasswordChangeRequestRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: PasswordChangeRequestRepositoryFindUniqueOrThrowInput) {
    const passwordChangeRequest = await this.prismaManager.getClient().passwordChangeRequest.findUniqueOrThrow({
      where: input.where,
    });

    return new PasswordChangeRequest({
      ...passwordChangeRequest,
      userId: Number(passwordChangeRequest.userId),
    });
  }

  public async findFirstOrThrow(input: PasswordChangeRequestRepositoryFindFirstOrThrowInput) {
    const passwordChangeRequest = await this.prismaManager.getClient().passwordChangeRequest.findFirstOrThrow({
      where: input.where,
    });

    return new PasswordChangeRequest({
      ...passwordChangeRequest,
      userId: Number(passwordChangeRequest.userId),
    });
  }

  public async create(input: PasswordChangeRequestRepositoryCreateInput) {
    const passwordChangeRequest = await this.prismaManager.getClient().passwordChangeRequest.create({
      data: {
        ...input,
      },
    });

    return new PasswordChangeRequest({
      ...passwordChangeRequest,
      userId: Number(passwordChangeRequest.userId),
    });
  }

  public deleteMany(input: PasswordChangeRequestRepositoryDeleteManyInput) {
    return this.prismaManager.getClient().passwordChangeRequest.deleteMany({ where: input.where });
  }
}
