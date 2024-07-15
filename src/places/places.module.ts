import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PlaceRepositoryContract } from '@app/places/contracts';
import { PlacesController } from '@app/places/places.controller';
import { PlaceRepository } from '@app/places/repositories/place.repository';
import { PlacesService } from '@app/places/services/places.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [PlacesController],
  providers: [
    PlacesService,
    {
      provide: PlaceRepositoryContract,
      useClass: PlaceRepository,
    },
  ],
  exports: [
    {
      provide: PlaceRepositoryContract,
      useClass: PlaceRepository,
    },
  ],
})
export class PlacesModule {}
