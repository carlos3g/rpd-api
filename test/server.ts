/* eslint-disable import/no-mutable-exports */
import type { INestApplication } from '@nestjs/common';
import type { Server } from 'net';
import { getApplication } from 'test/get-application';

// see: https://github.com/nestjs/nest/issues/13191#issuecomment-1938178694
export let app: INestApplication<Server>;
export let server: Server;

beforeAll(async () => {
  app = await getApplication();
  server = app.getHttpServer();

  await app.init();
});

afterAll(async () => {
  await app.close();
  server.close();
});
