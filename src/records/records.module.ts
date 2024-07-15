import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { RecordRepositoryContract } from '@app/records/contracts';
import { RecordsController } from '@app/records/records.controller';
import { RecordRepository } from '@app/records/repositories/record.repository';
import { RecordsService } from '@app/records/services/records.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [RecordsController],
  providers: [
    RecordsService,
    {
      provide: RecordRepositoryContract,
      useClass: RecordRepository,
    },
  ],
  exports: [
    {
      provide: RecordRepositoryContract,
      useClass: RecordRepository,
    },
  ],
})
export class RecordsModule {}
