import { EmotionRepositoryContract } from '@app/emotions/contracts';
import { UserRepositoryContract } from '@app/users/contracts';
import type { User } from '@app/users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';
import { getAccessToken } from '@test/auth';
import { emotionFactory, userFactory } from '@test/factories';
import { app, server } from '@test/server';
import * as request from 'supertest';

let userRepository: UserRepositoryContract;
let emotionRepository: EmotionRepositoryContract;

beforeAll(() => {
  userRepository = app.get<UserRepositoryContract>(UserRepositoryContract);
  emotionRepository = app.get<EmotionRepositoryContract>(EmotionRepositoryContract);
});

describe('(GET) /emotions', () => {
  let user: User;
  let token: string;

  beforeEach(async () => {
    user = await userRepository.create(userFactory());
    token = await getAccessToken(app, { email: user.email });
  });

  it('should throw unauthorized if not authenticated', async () => {
    const response = await request(server).get('/emotions').send(emotionFactory());

    expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
  });

  it('should be able to list emotions', async () => {
    await emotionRepository.create(emotionFactory());
    await emotionRepository.create(emotionFactory());

    const response = await request(server).get('/emotions').auth(token, { type: 'bearer' }).send();

    expect(response.status).toBe(HttpStatus.OK);

    expect(response.body).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect.arrayContaining([
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          name: expect.any(String),
        }),
      ])
    );
  });
});
