import { PrismaEmotionRepository } from '@app/emotions/repositories/prisma-emotion.repository';
import { PrismaModule } from '@app/lib/prisma/prisma.module';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { emotionFactory } from '@test/factories';
import { prisma } from '@test/server';

describe('PrismaEmotionRepository', () => {
  let emotionRepository: PrismaEmotionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaEmotionRepository],
    }).compile();

    emotionRepository = module.get<PrismaEmotionRepository>(PrismaEmotionRepository);
  });

  describe('create', () => {
    it('should create new emotion', async () => {
      const payload = emotionFactory();

      const result = await emotionRepository.create({
        name: payload.name,
      });

      expect(result).toMatchObject({
        name: payload.name,
      });
    });
  });

  describe('findUniqueOrThrow', () => {
    it('should find a emotion by unique identifier', async () => {
      const createdEmotion = await prisma.emotion.create({
        data: emotionFactory(),
      });

      const result = await emotionRepository.findUniqueOrThrow({
        where: { id: createdEmotion.id },
      });

      expect(result).toMatchObject({
        id: createdEmotion.id,
        name: createdEmotion.name,
      });
    });

    it('should throw an error if emotion not found', async () => {
      await expect(
        emotionRepository.findUniqueOrThrow({ where: { id: 'non-existent-id' as unknown as number } })
      ).rejects.toThrow();
    });
  });

  describe('findMany', () => {
    it('should find many emotions', async () => {
      await prisma.emotion.createMany({
        data: Array.from({ length: 30 }, () => emotionFactory()),
      });

      const result = await emotionRepository.findMany();

      expect(result).toHaveLength(30);
    });
  });

  describe('update', () => {
    it('should update an existing emotion', async () => {
      const createdEmotion = await prisma.emotion.create({
        data: emotionFactory(),
      });

      const result = await emotionRepository.update({
        where: { id: createdEmotion.id },
        data: { name: 'Updated Name' },
      });

      expect(result.name).toBe('Updated Name');
    });
  });
});
