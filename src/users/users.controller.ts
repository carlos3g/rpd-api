import { AuthGuard } from '@app/auth/guards/auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  // @Get()
  // public findAll() {
  //   return [];
  // }
  // @Get(':id')
  // public findOne(@Param('id') id: string) {
  //   return new User();
  // }
}
