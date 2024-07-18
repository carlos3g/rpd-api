import { AuthModule } from '@app/auth/auth.module';
import { EmotionsModule } from '@app/emotions/emotions.module';
import { HealthModule } from '@app/health/health.module';
import { PrismaClientExceptionFilter } from '@app/lib/prisma/exceptions/prisma-client-exception.filter';
import { PrismaService } from '@app/lib/prisma/services/prisma.service';
import { PeopleModule } from '@app/people/people.module';
import { PlacesModule } from '@app/places/places.module';
import { RecordsModule } from '@app/records/records.module';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    EmotionsModule,
    PeopleModule,
    PlacesModule,
    RecordsModule,
    UsersModule,
    HealthModule,
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
