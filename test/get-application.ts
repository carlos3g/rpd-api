import type { INestApplication } from '@nestjs/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createTestingModule } from '@test/create-testing-module';
import type { Server } from 'net';

let app: INestApplication<Server>;

export async function getApplication() {
  app = await createTestingModule();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  return app;
}
