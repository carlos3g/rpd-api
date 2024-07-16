import { UserDecorator } from '@app/auth/decorators/user.decorator';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { Paginate } from '@app/lib/prisma/interfaces';
import { PersonRepositoryContract } from '@app/people/contracts';
import { FilterPeopleQuery } from '@app/people/dtos/filter-people-query';
import { PersonCreateRequest } from '@app/people/dtos/person-create-request';
import { PersonUpdateRequest } from '@app/people/dtos/person-update-request';
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
@Controller('people')
export class PeopleController {
  public constructor(private readonly personRepository: PersonRepositoryContract) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async index(
    @UserDecorator() user: User,
    @Query('paginate') paginate: Paginate,
    @Query('filters') filters: FilterPeopleQuery
  ) {
    return this.personRepository.findManyPaginated({
      where: { ...filters, userId: user.id },
      options: paginate,
    });
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  public async create(@UserDecorator() user: User, @Body() input: PersonCreateRequest) {
    return this.personRepository.create({ ...input, userId: user.id });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async show(@UserDecorator() user: User, @Param('id') id: number) {
    return this.personRepository.findUniqueOrThrow({
      where: { id, userId: user.id },
    });
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  public async update(@UserDecorator() user: User, @Param('id') id: number, @Body() input: PersonUpdateRequest) {
    return this.personRepository.update({ where: { id, userId: user.id }, data: input });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number, @UserDecorator() user: User) {
    await this.personRepository.delete({ where: { id, userId: user.id } });
  }
}
