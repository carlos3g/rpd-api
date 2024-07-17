import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PrismaPersonRepository } from '@app/people/repositories/prisma-person.repository';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { personFactory, userFactory } from '@test/factories';
import { prisma } from '@test/server';

describe('PrismaPersonRepository', () => {
  let personRepository: PrismaPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaPersonRepository],
    }).compile();

    personRepository = module.get<PrismaPersonRepository>(PrismaPersonRepository);
  });

  describe('create', () => {
    it('should create new person', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const payload = { ...personFactory(), userId: user.id };

      const result = await personRepository.create(payload);

      expect(result).toMatchObject({
        name: payload.name,
        userId: payload.userId,
      });
    });
  });

  describe('findUniqueOrThrow', () => {
    it('should find a person by unique identifier', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPerson = await prisma.person.create({
        data: { ...personFactory(), userId: user.id },
      });

      const result = await personRepository.findUniqueOrThrow({
        where: { id: createdPerson.id, userId: createdPerson.userId },
      });

      expect(result).toMatchObject({
        id: createdPerson.id,
        name: createdPerson.name,
        userId: createdPerson.userId,
      });
    });

    it('should throw an error if person not found', async () => {
      await expect(
        personRepository.findUniqueOrThrow({ where: { id: 'non-existent-id' as unknown as number, userId: 1 } })
      ).rejects.toThrow();
    });
  });

  describe('findManyPaginated', () => {
    it('should find many people paginated', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      await prisma.person.createMany({
        data: Array.from({ length: 30 }, () => ({ ...personFactory(), userId: user.id })),
      });

      const result = await personRepository.findManyPaginated({
        where: { userId: user.id },
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
    it('should update an existing person', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPerson = await prisma.person.create({
        data: { ...personFactory(), userId: user.id },
      });

      const result = await personRepository.update({
        where: { id: createdPerson.id, userId: createdPerson.userId },
        data: { name: 'Updated Name' },
      });

      expect(result.name).toBe('Updated Name');
    });
  });

  describe('delete', () => {
    it('should delete an existing person', async () => {
      const user = await prisma.user.create({
        data: userFactory(),
      });

      const createdPerson = await prisma.person.create({
        data: { ...personFactory(), userId: user.id },
      });

      await personRepository.delete({
        where: { id: createdPerson.id, userId: createdPerson.userId },
      });

      await expect(prisma.person.findUniqueOrThrow({ where: { id: createdPerson.id } })).rejects.toThrow();
    });
  });
});
