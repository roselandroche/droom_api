const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');
const db = require('../../database/dbConfig');

describe('Employee Server', () => {
  const {
    registerEmployee,
    loginEmployee,
    testProspect,
    anotherTestProspect
  } = constant;
  let token;

  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployee);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployee)
      .then(res => {
        return (token = res.body.token);
      });
  });

  beforeEach(async () => {
    await db('prospect').truncate();
  });

  test('should returns status 200', () => {
    return request(server)
      .get('/api/droom')
      .set('authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should returns status 201 and valid data', () => {
    return request(server)
      .post('/api/droom/profile')
      .set('authorization', token)
      .send(testProspect)
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Prospect');
      });
  });

  test('should return a single user', async () => {
    await request(server)
      .post('/api/droom/profile')
      .set('authorization', token)
      .send(testProspect);

    return request(server)
      .get('/api/droom/1')
      .set('authorization', token)
      .then(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('phone_number');
        expect(res.body).toHaveProperty('job_title');
        expect(res.body).toHaveProperty('skills');
        expect(res.body).toHaveProperty('about_me');
      });
  });

  test('should update a single user', async () => {
    await request(server)
      .post('/api/droom/profile')
      .set('authorization', token)
      .send(testProspect);

    return request(server)
      .put('/api/droom/1/profile')
      .set('authorization', token)
      .send(anotherTestProspect)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Test Prospect 2');
      });
  });
});
