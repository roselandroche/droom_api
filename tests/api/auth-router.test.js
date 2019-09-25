const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');

describe('Auth Server', () => {
  const { testEmployee, testEmployer } = constant;
  let token;

  describe('POST /register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });
    test.skip('EMPLOYEE: should returns status 201', () => {
      return request(server)
        .post('/api/register')
        .send(testEmployee)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    test.skip('EMPLOYER: should returns status 201', () => {
      return request(server)
        .post('/api/register')
        .send(testEmployer)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('POST /login', () => {
    test.skip('should return a JWT ', () => {
      return request(server)
        .post('/api/login')
        .send(user)
        .then(res => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('token');
          token = res.body.token;
        });
    });
  });

  describe('GET /users', () => {
    test.skip('should returns status 200', () => {
      return request(server)
        .get('/api/users')
        .set('Authorization', token)
        .send(user)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
