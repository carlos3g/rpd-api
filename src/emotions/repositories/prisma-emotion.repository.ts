import type { EmotionRepositoryContract } from '@app/emotions/contracts';
import type {
  EmotionRepositoryCreateInput,
  EmotionRepositoryFindManyInput,
  EmotionRepositoryFindUniqueOrThrowInput,
  EmotionRepositoryUpdateInput,
} from '@app/emotions/dtos/emotion-repository-dtos';
import { Emotion } from '@app/emotions/entities/emotion.entity';
import { PrismaManagerService } from '@app/lib/prisma/services/prisma-manager.service';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaEmotionRepository implements EmotionRepositoryContract {
  public constructor(private readonly prismaManager: PrismaManagerService) {}

  public async findUniqueOrThrow(input: EmotionRepositoryFindUniqueOrThrowInput) {
    const emotion = await this.prismaManager.getClient().emotion.findUniqueOrThrow({
      where: input.where,
    });

    return new Emotion({
      ...emotion,
      id: Number(emotion.id),
    });
  }

  public async findMany(input?: EmotionRepositoryFindManyInput): Promise<Emotion[]> {
    const { name = undefined, ...where } = input?.where || {};

    const emotions = await this.prismaManager.getClient().emotion.findMany({
      where: {
        ...where,
        name: { mode: 'insensitive', contains: name },
      },
      orderBy: { createdAt: 'desc' },
    });

    return emotions.map((emotion) => new Emotion({ ...emotion, id: Number(emotion.id) }));
  }

  public async create(input: EmotionRepositoryCreateInput) {
    const emotion = await this.prismaManager.getClient().emotion.create({
      data: {
        ...input,
        uuid: uuidv4(),
      },
    });

    return new Emotion({
      ...emotion,
      id: Number(emotion.id),
    });
  }

  public async update(input: EmotionRepositoryUpdateInput) {
    const emotion = await this.prismaManager.getClient().emotion.update({
      where: input.where,
      data: input.data,
    });

    return new Emotion({
      ...emotion,
      id: Number(emotion.id),
    });
  }
}
