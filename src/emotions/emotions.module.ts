import { AuthModule } from '@app/auth/auth.module';
import { EmotionRepositoryContract } from '@app/emotions/contracts';
import { EmotionsController } from '@app/emotions/emotions.controller';
import { PrismaEmotionRepository } from '@app/emotions/repositories/prisma-emotion.repository';
import { EmotionsService } from '@app/emotions/services/emotions.service';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [EmotionsController],
  providers: [
    EmotionsService,
    {
      provide: EmotionRepositoryContract,
      useClass: PrismaEmotionRepository,
    },
  ],
  exports: [
    {
      provide: EmotionRepositoryContract,
      useClass: PrismaEmotionRepository,
    },
  ],
})
export class EmotionsModule {}
