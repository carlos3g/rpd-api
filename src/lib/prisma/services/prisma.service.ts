import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public constructor() {
    super();
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
