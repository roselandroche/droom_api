const Company = require('../../models/company-model');
const db = require('../../database/dbConfig');
const constant = require('../constants');

describe('The Company Model', () => {
  const { testCompany, anotherTestCompany } = constant;

  beforeEach(async () => {
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
  });

  afterAll(async () => {
    await db.raw('TRUNCATE employer RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE listings RESTART IDENTITY CASCADE');
  });

  test('Should add our new test company', async () => {
    // Test Setup
    await Company.addProfile(testCompany);

    // Assertion
    const company = await Company.getCompanies();
    expect(company.length).toBe(1);
    expect(company[0].id).toBe(1);
    expect(company[0].company_name).toBe('Test Company');
    expect(company[0].about_us).toBe('Super cool Test Company');
  });

  test('Should return a single company', async () => {
    // Test Setup
    await Company.addProfile(testCompany);
    await Company.addProfile(anotherTestCompany);

    // Assertions
    const company = await Company.singleCompany(2);
    expect(company.id).toBe(2);
  });

  test('Should update a company profile', async () => {
    // Test Setup
    await Company.addProfile(testCompany);
    await Company.updateProfile(1, anotherTestCompany);

    // Assertions
    const company = await Company.singleCompany(1);
    expect(company.company_name).toBe('Super Cool Company');
  });
});
