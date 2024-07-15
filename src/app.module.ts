import { AuthModule } from '@app/auth/auth.module';
import { EmotionsModule } from '@app/emotions/emotions.module';
import { PrismaClientExceptionFilter } from '@app/lib/prisma/exceptions/prisma-client-exception.filter';
import { PrismaService } from '@app/lib/prisma/services/prisma.service';
import { PeopleModule } from '@app/people/people.module';
import { PlacesModule } from '@app/places/places.module';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PlacesModule,
    PeopleModule,
    EmotionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
