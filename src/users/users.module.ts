import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { UserRepositoryContract } from '@app/users/contracts/user-repository.contract';
import { UsersServiceContract } from '@app/users/contracts/users-service.contract';
import { PrismaUserRepository } from '@app/users/repositories/prisma-user.repository';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersServiceContract,
      useClass: UsersService,
    },
    {
      provide: UserRepositoryContract,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    {
      provide: UsersServiceContract,
      useClass: UsersService,
    },
    {
      provide: UserRepositoryContract,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
