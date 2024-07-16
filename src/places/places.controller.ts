import { UserDecorator } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { Paginate } from '@app/lib/prisma/interfaces';
import { PlaceRepositoryContract } from '@app/places/contracts';
import { FilterPlacesQuery } from '@app/places/dtos/filter-places-query';
import { PlaceCreateRequest } from '@app/places/dtos/place-create-request';
import { PlaceUpdateRequest } from '@app/places/dtos/place-update-request';
import { User } from '@app/users/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('places')
export class PlacesController {
  public constructor(private readonly placeRepository: PlaceRepositoryContract) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async index(
    @UserDecorator() user: User,
    @Query('paginate') paginate: Paginate,
    @Query('filters') filters: FilterPlacesQuery
  ) {
    return this.placeRepository.findManyPaginated({
      where: { ...filters, userId: user.id },
      options: paginate,
    });
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async create(@UserDecorator() user: User, @Body() input: PlaceCreateRequest) {
    return this.placeRepository.create({ ...input, userId: user.id });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async show(@UserDecorator() user: User, @Param('id') id: number) {
    return this.placeRepository.findUniqueOrThrow({
      where: { id, userId: user.id },
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  public async update(@UserDecorator() user: User, @Param('id') id: number, @Body() input: PlaceUpdateRequest) {
    return this.placeRepository.update({ where: { id, userId: user.id }, data: input });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number, @UserDecorator() user: User) {
    await this.placeRepository.delete({ where: { id, userId: user.id } });
  }
}
