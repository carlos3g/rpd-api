import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PersonRepositoryContract } from '@app/people/contracts';
import { PeopleController } from '@app/people/people.controller';
import { PrismaPersonRepository } from '@app/people/repositories/prisma-person.repository';
import { PeopleService } from '@app/people/services/people.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PeopleController],
  providers: [
    PeopleService,
    {
      provide: PersonRepositoryContract,
      useClass: PrismaPersonRepository,
    },
  ],
  exports: [
    {
      provide: PersonRepositoryContract,
      useClass: PrismaPersonRepository,
    },
  ],
})
export class PeopleModule {}
