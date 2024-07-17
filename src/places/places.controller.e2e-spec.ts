import { PlaceRepositoryContract } from '@app/places/contracts';
import { UserRepositoryContract } from '@app/users/contracts';
import type { User } from '@app/users/entities/user.entity';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { getAccessToken } from '@test/auth';
import { placeFactory, userFactory } from '@test/factories';
import { app, server } from '@test/server';
import * as request from 'supertest';

let userRepository: UserRepositoryContract;
let placeRepository: PlaceRepositoryContract;

beforeAll(() => {
  userRepository = app.get<UserRepositoryContract>(UserRepositoryContract);
  placeRepository = app.get<PlaceRepositoryContract>(PlaceRepositoryContract);
});

describe('(POST) /places', () => {
  let token: string;

  beforeEach(async () => {
    const user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).post('/places').send(placeFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should create a place', async () => {
    const name = faker.person.fullName();
    const response = await request(server).post('/places').auth(token, { type: 'bearer' }).send({
      name,
    });

    expect(response.status).toEqual(HttpStatus.CREATED);
    expect(response.body).toMatchObject({ name });
    expect(response.body).not.toHaveProperty('id');
    expect(response.body).toHaveProperty('uuid');
  });
});

describe('(GET) /places/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/places/1').send(placeFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view a place', async () => {
    const place = await placeRepository.create({
      ...placeFactory(),
      userId: user.id,
    });

    const response = await request(server).get(`/places/${place.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      name: place.name,
      uuid: place.uuid,
    });
  });

  it('should not be able to view a place owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());
    const place = await placeRepository.create({
      ...placeFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).get(`/places/${place.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(GET) /places', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/places').send(placeFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to view only places owned and paginated', async () => {
    await placeRepository.create({ ...placeFactory(), userId: user.id });
    await placeRepository.create({ ...placeFactory(), userId: user.id });

    const response = await request(server).get('/places').auth(token, { type: 'bearer' }).send();

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

describe('(PATCH) /places/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).patch('/places/1').send(placeFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to update a place', async () => {
    const place = await placeRepository.create({
      ...placeFactory(),
      userId: user.id,
    });

    const newName = faker.person.fullName();

    const response = await request(server).patch(`/places/${place.id}`).auth(token, { type: 'bearer' }).send({
      name: newName,
    });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      name: newName,
      uuid: place.uuid,
    });
  });

  it('should not be able to update a place owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());

    const newName = faker.person.fullName();

    const place = await placeRepository.create({
      ...placeFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).patch(`/places/${place.id}`).auth(token, { type: 'bearer' }).send({
      name: newName,
    });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});

describe('(DELETE) /places/:id', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).delete('/places/1').send(placeFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to delete a place', async () => {
    const place = await placeRepository.create({
      ...placeFactory(),
      userId: user.id,
    });

    const response = await request(server).delete(`/places/${place.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('should not be able to delete a place owned by another user', async () => {
    const anotherUser = await userRepository.create(userFactory());

    const place = await placeRepository.create({
      ...placeFactory(),
      userId: anotherUser.id,
    });

    const response = await request(server).delete(`/places/${place.id}`).auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
