const Prospect = require('../../models/prospect-model');
const db = require('../../database/dbConfig');
const constant = require('../constants');

describe('The Prospect Model', () => {
  const { testProspect, anotherTestProspect } = constant;

  beforeEach(async () => {
    await db('prospect').truncate();
  });

  test('Should add our new test prospect', async () => {
    // Test Setup
    await Prospect.addProfile(testProspect);

    // Assertion
    const prospects = await Prospect.getProspects();
    expect(prospects.length).toBe(1);
    expect(prospects[0].id).toBe(1);
    expect(prospects[0].name).toBe('Test Prospect');
    expect(prospects[0].email).toBe('Test@jest.com');
    expect(prospects[0].phone_number).toBe('0000000000');
    expect(prospects[0].job_title).toBe('Test');
    expect(prospects[0].skills).toBe('Jest, Supertest');
    expect(prospects[0].about_me).toBe('I am the first Test Prospect');
  });

  test('Should return a single employee', async () => {
    // Test Setup
    await Prospect.addProfile(testProspect);
    await Prospect.addProfile(anotherTestProspect);

    // Assertions
    const prospect = await Prospect.singleProspect(2);
    expect(prospect.id).toBe(2);
  });

  test('Should update a employee profile', async () => {
    // Test Setup
    await Prospect.addProfile(testProspect);
    await Prospect.updateProfile(1, anotherTestProspect);

    // Assertions
    const prospect = await Prospect.singleProspect(1);
    expect(prospect.name).toBe('Test Prospect 2');
  });
});
