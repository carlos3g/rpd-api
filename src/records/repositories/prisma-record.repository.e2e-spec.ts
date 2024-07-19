import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PrismaRecordRepository } from '@app/records/repositories/prisma-record.repository';
import { faker } from '@faker-js/faker';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { personFactory, placeFactory, recordFactory, userFactory } from '@test/factories';
import { prisma } from '@test/server';

describe('PrismaRecordRepository', () => {
  let recordRepository: PrismaRecordRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaRecordRepository],
    }).compile();

    recordRepository = module.get<PrismaRecordRepository>(PrismaRecordRepository);
  });

  describe('create', () => {
    it('should create new record', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const place = await prisma.place.create({
        data: {
          ...placeFactory(),
          userId: user.id,
        },
      });

      const person = await prisma.person.create({
        data: {
          ...personFactory(),
          userId: user.id,
        },
      });

      const payload = {
        ...recordFactory(),
        userId: user.id,
        placeId: place.id,
        people: { connect: { id: person.id } },
      };

      const result = await recordRepository.create({
        ...payload,
        userId: Number(user.id),
        placeId: Number(place.id),
      });

      expect(result).toMatchObject({
        event: payload.event,
        placeId: Number(payload.placeId),
        userId: Number(payload.userId),
      });
    });
  });

  describe('findUniqueOrThrow', () => {
    it('should find a record by unique identifier', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const place = await prisma.place.create({
        data: {
          ...placeFactory(),
          userId: user.id,
        },
      });

      const person = await prisma.person.create({
        data: {
          ...personFactory(),
          userId: user.id,
        },
      });

      const payload = {
        ...recordFactory(),
        userId: user.id,
        placeId: place.id,
        people: { connect: { id: person.id } },
      };

      const createdRecord = await prisma.record.create({
        data: payload,
      });

      const result = await recordRepository.findUniqueOrThrow({
        where: { id: Number(createdRecord.id), userId: Number(createdRecord.userId) },
      });

      expect(result).toMatchObject({
        id: Number(createdRecord.id),
        userId: Number(createdRecord.userId),
      });
    });

    it('should throw an error if record not found', async () => {
      await expect(
        recordRepository.findUniqueOrThrow({ where: { id: 'non-existent-id' as unknown as number, userId: 1 } })
      ).rejects.toThrow();
    });
  });

  describe('findManyPaginated', () => {
    it('should find many records paginated', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const place = await prisma.place.create({
        data: {
          ...placeFactory(),
          userId: user.id,
        },
      });

      await prisma.record.createMany({
        data: Array.from({ length: 20 }, () => ({
          ...recordFactory(),
          userId: user.id,
          placeId: place.id,
        })),
      });

      const result = await recordRepository.findManyPaginated({
        where: { userId: Number(user.id) },
        options: { page: 1, perPage: 10 },
      });

      expect(result.data).toHaveLength(10);
      expect(result.meta.total).toBe(20);
      expect(result.meta.currentPage).toBe(1);
      expect(result.meta.perPage).toBe(10);
      expect(result.meta.lastPage).toBe(2);
      expect(result.meta.prev).toBeNull();
      expect(result.meta.next).toBe(2);
    });
  });

  describe('update', () => {
    it('should update an existing record', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const place = await prisma.place.create({
        data: {
          ...placeFactory(),
          userId: user.id,
        },
      });

      const person = await prisma.person.create({
        data: {
          ...personFactory(),
          userId: user.id,
        },
      });

      const createdRecord = await prisma.record.create({
        data: { ...recordFactory(), userId: user.id, placeId: place.id, people: { connect: { id: person.id } } },
      });

      const event = faker.lorem.sentence();

      const result = await recordRepository.update({
        where: { id: Number(createdRecord.id), userId: Number(createdRecord.userId) },
        data: { event },
      });

      expect(result.event).toBe(event);
    });
  });

  describe('delete', () => {
    it('should delete an existing record', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const place = await prisma.place.create({
        data: {
          ...placeFactory(),
          userId: user.id,
        },
      });

      const person = await prisma.person.create({
        data: {
          ...personFactory(),
          userId: user.id,
        },
      });

      const createdRecord = await prisma.record.create({
        data: { ...recordFactory(), userId: user.id, placeId: place.id, people: { connect: { id: person.id } } },
      });

      await recordRepository.delete({
        where: { id: Number(createdRecord.id), userId: Number(createdRecord.userId) },
      });

      await expect(prisma.record.findUniqueOrThrow({ where: { id: createdRecord.id } })).rejects.toThrow();
    });
  });
});
