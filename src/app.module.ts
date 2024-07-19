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

// see: https://github.com/prisma/studio/issues/614
// see: https://stackoverflow.com/a/76013128/13274020
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, func-names
(BigInt.prototype as any).toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const int = Number.parseInt(this.toString(), 10);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return int ?? this.toString();
};

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
