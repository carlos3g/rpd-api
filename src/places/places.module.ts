import { AuthModule } from '@app/auth/auth.module';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PlaceRepositoryContract } from '@app/places/contracts';
import { PlacesController } from '@app/places/places.controller';
import { PrismaPlaceRepository } from '@app/places/repositories/prisma-place.repository';
import { PlacesService } from '@app/places/services/places.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PlacesController],
  providers: [
    PlacesService,
    {
      provide: PlaceRepositoryContract,
      useClass: PrismaPlaceRepository,
    },
  ],
  exports: [
    {
      provide: PlaceRepositoryContract,
      useClass: PrismaPlaceRepository,
    },
  ],
})
export class PlacesModule {}
