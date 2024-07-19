import { UserDecorator } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { PersonRepositoryContract } from '@app/people/contracts';
import { PlaceRepositoryContract } from '@app/places/contracts';
import { RecordRepositoryContract } from '@app/records/contracts';
import { FilterRecordsQuery } from '@app/records/dtos/filter-records-query';
import { RecordCreateRequest } from '@app/records/dtos/record-create-request';
import { RecordUpdateRequest } from '@app/records/dtos/record-update-request';
import { Paginate } from '@app/shared/dtos/paginate';
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
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('records')
export class RecordsController {
  public constructor(
    private readonly recordRepository: RecordRepositoryContract,
    private readonly placeRepository: PlaceRepositoryContract,
    private readonly personRepository: PersonRepositoryContract
  ) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async index(
    @UserDecorator() user: User,
    @Query('paginate') paginate: Paginate,
    @Query('filters') filters: FilterRecordsQuery
  ) {
    return this.recordRepository.findManyPaginated({
      where: { ...filters, userId: user.id },
      options: paginate,
    });
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async create(@UserDecorator() user: User, @Body() input: RecordCreateRequest) {
    const { placeUuid, personUuid, ...rest } = input;

    const person = personUuid
      ? await this.personRepository.findUniqueOrThrow({
          where: {
            uuid: personUuid,
            userId: user.id,
          },
        })
      : undefined;

    const place = await this.placeRepository.findUniqueOrThrow({
      where: {
        uuid: placeUuid,
        userId: user.id,
      },
    });

    return this.recordRepository.create({
      ...rest,
      userId: user.id,
      placeId: place.id,
      personId: person?.id,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async show(@UserDecorator() user: User, @Param('id') id: number) {
    return this.recordRepository.findUniqueOrThrow({
      where: { id, userId: user.id },
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  public async update(@UserDecorator() user: User, @Param('id') id: number, @Body() input: RecordUpdateRequest) {
    return this.recordRepository.update({ where: { id, userId: user.id }, data: input });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number, @UserDecorator() user: User) {
    await this.recordRepository.delete({ where: { id, userId: user.id } });
  }
}
