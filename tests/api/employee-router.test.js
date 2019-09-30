const request = require('supertest');
const server = require('../../api/server');
const constant = require('../constants');
const db = require('../../database/dbConfig');

describe('Employee Server', () => {
  const {
    registerEmployer,
    loginEmployer,
    registerEmployee,
    loginEmployee,
    testProspect,
    anotherTestProspect
  } = constant;

  beforeEach(async () => {
    await db('prospect').truncate();
    await db('users').truncate();
  });

  afterAll(async () => {
    await db('prospect').truncate();
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
      .get('/api/droom')
      .set('authorization', employerToken)
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('should return a single user', async () => {
    // Register an employee account and login to employee account,
    // sets an employeeToken
    let employeeToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployee);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployee)
      .then(res => {
        return (employeeToken = res.body.token);
      });
    await request(server)
      .post('/api/droom/profile')
      .set('authorization', employeeToken)
      .send(testProspect);

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
      .get('/api/droom/1')
      .set('authorization', employerToken)
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

  test('should returns status 201 and valid data', async () => {
    // Register an employee account and login to employee account,
    // sets an employeeToken
    let employeeToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployee);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployee)
      .then(res => {
        return (employeeToken = res.body.token);
      });

    return request(server)
      .post('/api/droom/profile')
      .set('authorization', employeeToken)
      .send(testProspect)
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Prospect');
      });
  });

  test('should update a single user', async () => {
    // Register an employee account and login to employee account,
    // sets an employeeToken
    let employeeToken;
    await request(server)
      .post('/api/auth/register')
      .send(registerEmployee);
    await request(server)
      .post('/api/auth/login')
      .send(loginEmployee)
      .then(res => {
        return (employeeToken = res.body.token);
      });
    // Post a profile using the employee token
    await request(server)
      .post('/api/droom/profile')
      .set('authorization', employeeToken)
      .send(testProspect);

    // updates that posted profile with new information
    return request(server)
      .put('/api/droom/1/profile')
      .set('authorization', employeeToken)
      .send(anotherTestProspect)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Test Prospect 2');
      });
  });
});
