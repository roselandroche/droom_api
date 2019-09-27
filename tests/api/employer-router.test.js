const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');
const db = require('../../database/dbConfig');

// TODO: SET CROSS-RESTRICTION ON ROUTES
// TODO: EXPRESS VALIDATOR

describe('Employee Server', () => {
  const {
    registerEmployer,
    loginEmployer,
    testCompany,
    anotherTestCompany,
    listing,
    listingUpdate
  } = constant;
  let token;

  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (token = res.body.token);
      });
  });

  beforeEach(async () => {
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
  });

  afterEach(async () => {
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
  });

  test('should returns status 200', () => {
    return request(server)
      .get('/api/company')
      .set('authorization', token)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should return a single company', async () => {
    await request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testCompany);

    return request(server)
      .get('/api/company/1')
      .set('authorization', token)
      .then(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('company_name');
        expect(res.body).toHaveProperty('about_us');
      });
  });

  test('should return a job listings', async () => {
    await request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testCompany);

    await request(server)
      .post('/api/company/job')
      .set('authorization', token)
      .send(listing);

    return request(server)
      .get('/api/company/jobs')
      .set('authorization', token)
      .then(res => {
        console.log(res.body);
        expect(res.status).toBe(200);
      });
  });

  test('should return a single job posting', async () => {
    await request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testCompany);

    await request(server)
      .post('/api/company/job')
      .set('authorization', token)
      .send(listing);

    return request(server)
      .put('/api/company/1/job')
      .set('authorization', token)
      .then(res => {
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Test Prospect 2');
      });
  });

  test.skip('should returns status 201 and valid data', () => {
    return request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testCompany)
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Prospect');
      });
  });

  test.skip('should update a single user', async () => {
    await request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testProspect);

    return request(server)
      .put('/api/company/1/profile')
      .set('authorization', token)
      .send(anotherTestProspect)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Test Prospect 2');
      });
  });
});
