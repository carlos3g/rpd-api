import { PrismaModule } from '@app/lib/prisma/prisma.module';
import { PrismaUserRepository } from '@app/users/repositories/prisma-user.repository';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { userFactory } from '@test/factories';
import { prisma } from '@test/server';

describe('PrismaUserRepository', () => {
  let userRepository: PrismaUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PrismaUserRepository],
    }).compile();

    userRepository = module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  describe('create', () => {
    it('should create new user', async () => {
      const payload = userFactory();

      const result = await userRepository.create(payload);

      expect(result).toMatchObject({
        name: payload.name,
        email: payload.email,
      });
    });
  });

  describe('findUniqueOrThrow', () => {
    it('should find a user by unique identifier', async () => {
      const createdUser = await prisma.user.create({
        data: userFactory(),
      });

      const result = await userRepository.findUniqueOrThrow({
        where: { id: createdUser.id },
      });

      expect(result).toMatchObject({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      });
    });

    it('should throw an error if user not found', async () => {
      await expect(
        userRepository.findUniqueOrThrow({ where: { id: 'non-existent-id' as unknown as number } })
      ).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const createdUser = await prisma.user.create({
        data: userFactory(),
      });

      const result = await userRepository.update({
        where: { id: createdUser.id },
        data: { name: 'Updated Name' },
      });

      expect(result.name).toBe('Updated Name');
    });
  });
});
