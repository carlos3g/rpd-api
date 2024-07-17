import { AppModule } from '@app/app.module';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Server } from 'net';

export async function createTestingModule() {
  const moduleFixture = Test.createTestingModule({
    imports: [AppModule],
  });

  const compiled = await moduleFixture.compile();

  const app = compiled.createNestApplication<INestApplication<Server>>();

  return app;
}
