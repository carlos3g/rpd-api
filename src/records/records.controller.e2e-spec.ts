import { PersonRepositoryContract } from '@app/people/contracts';
import { PlaceRepositoryContract } from '@app/places/contracts';
import { RecordRepositoryContract } from '@app/records/contracts';
import { UserRepositoryContract } from '@app/users/contracts/user-repository.contract';
import type { User } from '@app/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { getAccessToken } from '@test/auth';
import { placeFactory, recordFactory, userFactory } from '@test/factories';
import { app, server } from '@test/server';
import * as request from 'supertest';

let userRepository: UserRepositoryContract;
let recordRepository: RecordRepositoryContract;
let personRepository: PersonRepositoryContract;
let placeRepository: PlaceRepositoryContract;

beforeAll(() => {
  userRepository = app.get<UserRepositoryContract>(UserRepositoryContract);
  recordRepository = app.get<RecordRepositoryContract>(RecordRepositoryContract);
  personRepository = app.get<PersonRepositoryContract>(PersonRepositoryContract);
  placeRepository = app.get<PlaceRepositoryContract>(PlaceRepositoryContract);
});

describe('(POST) /records', () => {
  let token: string;
  let user: User;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).post('/records').send(recordFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should create a record', async () => {
    const place = await placeRepository.create({ ...placeFactory(), userId: user.id });
    const recordPayload = {
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    };
    const response = await request(server).post('/records').auth(token, { type: 'bearer' }).send(recordPayload);

    expect(response.status).toEqual(HttpStatus.CREATED);
    expect(response.body).not.toHaveProperty('id');
    expect(response.body).toHaveProperty('uuid');
  });
});

describe('(GET) /records/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/records/1').send(recordFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view a record', async () => {
    const place = await placeRepository.create({ ...placeFactory(), userId: user.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    });

    const response = await request(server).get(`/records/${record.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      uuid: record.uuid,
    });
  });

  it('should not be able to view a record owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());
    const place = await placeRepository.create({ ...placeFactory(), userId: anotherUser.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: anotherUser.id,
    });

    const response = await request(server).get(`/records/${record.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(GET) /records', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/records').send(recordFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view only records owned and paginated', async () => {
    const place = await placeRepository.create({ ...placeFactory(), userId: user.id });

    await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    });
    await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    });

    const response = await request(server).get('/records').auth(token, { type: 'bearer' }).send();

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

describe('(PATCH) /records/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).patch('/records/1').send(recordFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to update a record', async () => {
    const place = await placeRepository.create({ ...placeFactory(), userId: user.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    });

    const newBehavior = faker.lorem.sentence();

    const response = await request(server).patch(`/records/${record.id}`).auth(token, { type: 'bearer' }).send({
      behavior: newBehavior,
    });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      behavior: newBehavior,
      uuid: record.uuid,
    });
  });

  it('should not be able to update a record owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());

    const newBehavior = faker.lorem.sentence();

    const place = await placeRepository.create({ ...placeFactory(), userId: anotherUser.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: anotherUser.id,
    });

    const response = await request(server).patch(`/records/${record.id}`).auth(token, { type: 'bearer' }).send({
      behavior: newBehavior,
    });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(DELETE) /records/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).delete('/records/1').send(recordFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to delete a record', async () => {
    const place = await placeRepository.create({ ...placeFactory(), userId: user.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: user.id,
    });

    const response = await request(server).delete(`/records/${record.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not be able to delete a record owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());
    const place = await placeRepository.create({ ...placeFactory(), userId: anotherUser.id });

    const record = await recordRepository.create({
      ...recordFactory(),
      placeId: place.id,
      userId: anotherUser.id,
    });

    const response = await request(server).delete(`/records/${record.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
