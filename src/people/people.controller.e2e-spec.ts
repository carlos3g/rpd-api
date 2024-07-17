import { PersonRepositoryContract } from '@app/people/contracts';
import { UserRepositoryContract } from '@app/users/contracts/user-repository.contract';
import type { User } from '@app/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { getAccessToken } from '@test/auth';
import { personFactory, userFactory } from '@test/factories';
import { app, server } from '@test/server';
import * as request from 'supertest';

let userRepository: UserRepositoryContract;
let personRepository: PersonRepositoryContract;

beforeAll(() => {
  userRepository = app.get<UserRepositoryContract>(UserRepositoryContract);
  personRepository = app.get<PersonRepositoryContract>(PersonRepositoryContract);
});

describe('(POST) /people', () => {
  let token: string;

  beforeEach(async () => {
    const user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).post('/people').send(personFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should create a person', async () => {
    const name = faker.person.fullName();
    const response = await request(server).post('/people').auth(token, { type: 'bearer' }).send({
      name,
    });

    expect(response.status).toEqual(HttpStatus.CREATED);
    expect(response.body).toMatchObject({
      name,
    });
    expect(response.body).not.toHaveProperty('id');
    expect(response.body).toHaveProperty('uuid');
  });
});

describe('(GET) /people/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/people/1').send(personFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view a person', async () => {
    const person = await personRepository.create({
      ...personFactory(),
      userId: user.id,
    });

    const response = await request(server).get(`/people/${person.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      name: person.name,
      uuid: person.uuid,
    });
  });

  it('should not be able to view a person owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());
    const person = await personRepository.create({
      ...personFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).get(`/people/${person.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(GET) /people', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/people').send(personFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view only people owned and paginated', async () => {
    await personRepository.create({ ...personFactory(), userId: user.id });
    await personRepository.create({ ...personFactory(), userId: user.id });

    const response = await request(server).get('/people').auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');

    expect(response.body).toMatchObject({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: expect.arrayContaining([
        expect.objectContaining({
          userId: user.id,
        }),
      ]),
    });
  });
});

describe('(PATCH) /people/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).patch('/people/1').send(personFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to update a person', async () => {
    const person = await personRepository.create({
      ...personFactory(),
      userId: user.id,
    });

    const newName = faker.person.fullName();

    const response = await request(server).patch(`/people/${person.id}`).auth(token, { type: 'bearer' }).send({
      name: newName,
    });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      name: newName,
      uuid: person.uuid,
    });
  });

  it('should not be able to update a person owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());

    const newName = faker.person.fullName();

    const person = await personRepository.create({
      ...personFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).patch(`/people/${person.id}`).auth(token, { type: 'bearer' }).send({
      name: newName,
    });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(DELETE) /people/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).delete('/people/1').send(personFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to delete a person', async () => {
    const person = await personRepository.create({
      ...personFactory(),
      userId: user.id,
    });

    const response = await request(server).delete(`/people/${person.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not be able to delete a person owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());

    const person = await personRepository.create({
      ...personFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).delete(`/people/${person.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
