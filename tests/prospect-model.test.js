const Prospect = require('../models/prospect-model');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('The Dreams Model', () => {
  beforeEach(async () => {
    await db('prospect').truncate();
  });

  describe('ADD Prospect', () => {
    // Adding a test prospect to test insert and add
    const testProspect = {
      name: 'Test Prospect',
      email: 'Test@jest.com',
      phone_number: '00000000000',
      job_title: 'Test',
      skills: 'Jest, Supertest',
      about_me: 'I am the first Test Prospect'
    };

    // Adding a second test prospect to test filtered return
    const anotherTestProspect = {
      name: 'Test Prospect 2',
      email: 'Test2@jest.com',
      phone_number: '0000000001',
      job_title: 'Test',
      skills: 'Jest, Supertest',
      about_me: 'I am the second Test Prospect'
    };

    test('Should add our new test prospects', async () => {});
  });

  describe('GET /prospects', () => {
    test('Should return both test prospects prospects', async () => {
      // Test Setup
      await Prospect.get('prospect');

      // Assertion
    });
  });
});
