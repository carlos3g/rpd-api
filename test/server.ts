/* eslint-disable import/no-mutable-exports */
import { PrismaService } from '@app/lib/prisma/services/prisma.service';
import type { INestApplication } from '@nestjs/common';
import { getApplication } from '@test/get-application';
import type { Server } from 'net';

// see: https://github.com/nestjs/nest/issues/13191#issuecomment-1938178694
export let app: INestApplication<Server>;
export let server: Server;
export let prisma: PrismaService;

beforeAll(async () => {
  app = await getApplication();
  server = app.getHttpServer();
  prisma = app.get<PrismaService>(PrismaService);

  await app.init();
});

afterEach(async () => {
  await prisma.clearDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
  await app.close();
  server.close();
});
