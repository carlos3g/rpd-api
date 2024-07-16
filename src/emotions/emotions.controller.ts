import { AuthGuard } from '@app/auth/guards/auth.guard';
import { EmotionRepositoryContract } from '@app/emotions/contracts';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('emotions')
export class EmotionsController {
  public constructor(private readonly emotionRepository: EmotionRepositoryContract) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async index() {
    return this.emotionRepository.findMany();
  }
}
