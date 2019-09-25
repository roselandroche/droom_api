const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');
const db = require('../../database/dbConfig');

describe('Auth Server', () => {
  const { registerUser, loginUser } = constant;
  let token;

  describe('POST /register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    test('should returns status 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send(registerUser)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('POST /login', () => {
    test('should return a JWT ', () => {
      return request(server)
        .post('/api/auth/login')
        .send(loginUser)
        .then(res => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('token');
          token = res.body.token;
        });
    });
  });
});
