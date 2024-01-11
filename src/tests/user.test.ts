const supertest = require('supertest');
import { describe, expect, test } from '@jest/globals';

describe('User Controller', () => {
  test('POST /users', async () => {
    const app = require('../../app');

    const res = await supertest(app)
      .post('/users')
      .send({ name: 'test 1' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });
});
