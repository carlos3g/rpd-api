import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PersonRepositoryContract } from '@app/people/contracts';
import { PeopleController } from '@app/people/people.controller';
import { PersonRepository } from '@app/people/repositories/person.repository';
import { PeopleService } from '@app/people/services/people.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    {
      provide: PersonRepositoryContract,
      useClass: PersonRepository,
    },
  ],
  exports: [
    {
      provide: PersonRepositoryContract,
      useClass: PersonRepository,
    },
  ],
})
export class PeopleModule {}
