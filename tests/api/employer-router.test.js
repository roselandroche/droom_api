const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');
const db = require('../../database/dbConfig');

describe('Employer Server', () => {
  const {
    registerEmployer,
    loginEmployer,
    testCompany,
    anotherTestCompany,
    listing,
    listingUpdate
  } = constant;

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
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db('users').truncate();
  });

  afterEach(async () => {
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db('users').truncate();
  });

  test('should returns status 200', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    return request(server)
      .get('/api/company')
      .set('authorization', employerToken)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should return a single company', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    await request(server)
      .post('/api/company/profile')
      .set('authorization', token)
      .send(testCompany);

    return request(server)
      .get('/api/company/1')
      .set('authorization', employerToken)
      .then(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('company_name');
        expect(res.body).toHaveProperty('about_us');
      });
  });

  test('should return a job listings', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    await request(server)
      .post('/api/company/profile')
      .set('authorization', employerToken)
      .send(testCompany);

    await request(server)
      .post('/api/company/job')
      .set('authorization', employerToken)
      .send(listing);

    return request(server)
      .get('/api/company/jobs')
      .set('authorization', employerToken)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should return a single job posting', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    await request(server)
      .post('/api/company/profile')
      .set('authorization', employerToken)
      .send(testCompany);

    await request(server)
      .post('/api/company/job')
      .set('authorization', employerToken)
      .send(listing);

    return request(server)
      .get('/api/company/1/job')
      .set('authorization', employerToken)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.position).toBe('Software Engineer in Test');
      });
  });

  test('should returns status 201 and valid data', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    return request(server)
      .post('/api/company/profile')
      .set('authorization', employerToken)
      .send(testCompany)
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.company_name).toBe('Test Company');
      });
  });

  test('should update a single listing', async () => {
    // Register an employer account and login to employee account,
    // sets an employerToken
    let employerToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployer);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployer)
      .then(res => {
        return (employerToken = res.body.token);
      });

    await request(server)
      .post('/api/company/profile')
      .set('authorization', employerToken)
      .send(testCompany);

    await request(server)
      .post('/api/company/job')
      .set('authorization', employerToken)
      .send(listing);

    return request(server)
      .put('/api/company/1/job')
      .set('authorization', employerToken)
      .send(listingUpdate)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.position).toBe('DevOps Engineer');
      });
  });
});
