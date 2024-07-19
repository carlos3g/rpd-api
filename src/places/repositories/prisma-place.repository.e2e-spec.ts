import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PrismaPlaceRepository } from '@app/places/repositories/prisma-place.repository';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { placeFactory, userFactory } from '@test/factories';
import { prisma } from '@test/server';

describe('PrismaPlaceRepository', () => {
  let placeRepository: PrismaPlaceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaPlaceRepository],
    }).compile();

    placeRepository = module.get<PrismaPlaceRepository>(PrismaPlaceRepository);
  });

  describe('create', () => {
    it('should create new place', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const payload = { ...placeFactory(), userId: Number(user.id) };

      const result = await placeRepository.create(payload);

      expect(result).toMatchObject({
        name: payload.name,
        userId: payload.userId,
      });
    });
  });

  describe('findUniqueOrThrow', () => {
    it('should find a place by unique identifier', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPlace = await prisma.place.create({
        data: { ...placeFactory(), userId: user.id },
      });

      const result = await placeRepository.findUniqueOrThrow({
        where: { id: Number(createdPlace.id), userId: Number(createdPlace.userId) },
      });

      expect(result).toMatchObject({
        id: Number(createdPlace.id),
        name: createdPlace.name,
        userId: Number(createdPlace.userId),
      });
    });

    it('should throw an error if place not found', async () => {
      await expect(
        placeRepository.findUniqueOrThrow({ where: { id: 'non-existent-id' as unknown as number, userId: 1 } })
      ).rejects.toThrow();
    });
  });

  describe('findManyPaginated', () => {
    it('should find many places paginated', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      await prisma.place.createMany({
        data: Array.from({ length: 30 }, () => ({ ...placeFactory(), userId: user.id })),
      });

      const result = await placeRepository.findManyPaginated({
        where: { userId: Number(user.id) },
        options: { page: 1, perPage: 10 },
      });

      expect(result.data).toHaveLength(10);
      expect(result.meta.total).toBe(30);
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.perPage).toBe(10);
      expect(result.meta.lastPage).toBe(3);
      expect(result.meta.prev).toBeNull();
      expect(result.meta.next).toBe(2);
    });
  });

  describe('update', () => {
    it('should update an existing place', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPlace = await prisma.place.create({
        data: { ...placeFactory(), userId: user.id },
      });

      const result = await placeRepository.update({
        where: { id: Number(createdPlace.id), userId: Number(createdPlace.userId) },
        data: { name: 'Updated Name' },
      });

      expect(result.name).toBe('Updated Name');
    });
  });

  describe('delete', () => {
    it('should delete an existing place', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPlace = await prisma.place.create({
        data: { ...placeFactory(), userId: user.id },
      });

      await placeRepository.delete({
        where: { id: Number(createdPlace.id), userId: Number(createdPlace.userId) },
      });

      await expect(prisma.place.findUniqueOrThrow({ where: { id: createdPlace.id } })).rejects.toThrow();
    });
  });
});
