import { UserDecorator } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { Paginate } from '@app/lib/prisma/interfaces';
import { RecordRepositoryContract } from '@app/records/contracts';
import { FilterRecordsQuery } from '@app/records/dtos/filter-records-query';
import { RecordCreateRequest } from '@app/records/dtos/record-create-request';
import { RecordUpdateRequest } from '@app/records/dtos/record-update-request';
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
@Controller('records')
export class RecordsController {
  public constructor(private readonly recordRepository: RecordRepositoryContract) {}

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
  @HttpCode(HttpStatus.OK)
  public async create(@UserDecorator() user: User, @Body() input: RecordCreateRequest) {
    return this.recordRepository.create({ ...input, userId: user.id });
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
