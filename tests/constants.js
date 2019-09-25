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

// Adding a test company
const testCompany = {
  company_name: 'Test Company',
  about_us: 'Super cool Test Company'
};

// Adding a test employee
const testEmployee = {
  username: 'testEmployee',
  password: 'pass123',
  role: 'employee'
};

// Adding a test employer
const testEmployer = {
  username: 'testEmployer',
  password: 'pass123',
  role: 'employer'
};

module.exports = {
  testProspect,
  anotherTestProspect,
  testCompany,
  testEmployer,
  testEmployee
};
