import type { Emotion } from '@app/emotions/entities/emotion.entity';
import type { Person } from '@app/people/entities/person.entity';
import type { Record } from '@app/records/entities/record.entity';
import type { User } from '@app/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export const userFactory = (): Omit<User, 'id' | 'createdAt' | 'updatedAt'> => ({
  name: faker.person.fullName(),
  uuid: uuidv4(),
  birthDate: faker.date.birthdate(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const personFactory = (): Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'userId'> => ({
  name: faker.person.fullName(),
  uuid: uuidv4(),
});

export const placeFactory = (): Omit<Person, 'id' | 'createdAt' | 'updatedAt' | 'userId'> => ({
  name: faker.person.fullName(),
  uuid: uuidv4(),
});

export const emotionFactory = (): Omit<Emotion, 'id' | 'createdAt' | 'updatedAt' | 'userId'> => ({
  name: faker.person.fullName(),
  uuid: uuidv4(),
});

export const recordFactory = (): Omit<Record, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'placeId'> => ({
  behavior: faker.lorem.sentence(),
  event: faker.lorem.sentence(),
  thought: faker.lorem.sentence(),
  uuid: uuidv4(),
});
