import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'password';

const usersSeed = async () => {
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: 'test@test.com',
      birthDate: faker.date.birthdate(),
      password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
      uuid: uuidv4(),
    },
  });
};

async function main() {
  await usersSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
