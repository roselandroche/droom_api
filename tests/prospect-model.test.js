const Prospect = require('../models/prospect-model');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('The Prospect Model', () => {
  beforeEach(async () => {
    await db('prospect').truncate();
  });

  // Adding a test prospect to test insert and add
  const testProspect = {
    name: 'Test Prospect',
    email: 'Test@jest.com',
    phone_number: '0000000000',
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

  test('Should add our new test prospect', async () => {
    // Test Setup
    await Prospect.add(testProspect);

    // Assertion
    const prospects = await db.select('*').from('prospect');
    expect(prospects.length).toBe(1);
    expect(prospects[0].id).toBe(1);
    expect(prospects[0].name).toBe('Test Prospect');
    expect(prospects[0].email).toBe('Test@jest.com');
    expect(prospects[0].phone_number).toBe('0000000000');
    expect(prospects[0].job_title).toBe('Test');
    expect(prospects[0].skills).toBe('Jest, Supertest');
    expect(prospects[0].about_me).toBe('I am the first Test Prospect');
  });

  test('Should add our second new test prospect', async () => {
    // Test Setup
    await Prospect.add(testProspect);
    await Prospect.add(anotherTestProspect);

    // Assertion
    const prospects = await db.select('*').from('prospect');
    expect(prospects.length).toBe(2);
    expect(prospects[1].id).toBe(2);
  });

  test('Should return a single prospect', async () => {
    // Test Setup
    await Prospect.add(testProspect);
    await Prospect.add(anotherTestProspect);

    // Assertion
    const single = await Prospect.single(1);
    console.log(single);
    expect(single.id).toBe(1);
    expect(single.name).toBe('Test Prospect');
  });
});
