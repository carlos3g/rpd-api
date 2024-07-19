import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PeopleModule } from '@app/people/people.module';
import { PlacesModule } from '@app/places/places.module';
import { RecordRepositoryContract } from '@app/records/contracts';
import { RecordsController } from '@app/records/records.controller';
import { PrismaRecordRepository } from '@app/records/repositories/prisma-record.repository';
import { RecordsService } from '@app/records/services/records.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AuthModule, PeopleModule, PlacesModule],
  controllers: [RecordsController],
  providers: [
    RecordsService,
    {
      provide: RecordRepositoryContract,
      useClass: PrismaRecordRepository,
    },
  ],
  exports: [
    {
      provide: RecordRepositoryContract,
      useClass: PrismaRecordRepository,
    },
  ],
})
export class RecordsModule {}
