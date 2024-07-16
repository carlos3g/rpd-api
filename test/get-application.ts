import type { INestApplication } from '@nestjs/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Server } from 'net';
import { createTestingModule } from 'test/create-testing-module';

let app: INestApplication<Server>;

export async function getApplication() {
  app = await createTestingModule();

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  return app;
}
