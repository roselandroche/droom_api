// Register
const registerUser = {
  username: 'testUser',
  password: 'pass123',
  role: 'employee'
};

// Login
const loginUser = {
  username: 'testUser',
  password: 'pass123'
};

// Registration for protected route
const registerEmployee = {
  username: 'testEmployee',
  password: 'P_o0i9u8y7t6r5E$',
  role: 'employee'
};

// Login for protected route
const loginEmployee = {
  username: 'testEmployee',
  password: 'P_o0i9u8y7t6r5E$'
};

// Registration for protected route
const registerEmployer = {
  username: 'testEmployee',
  password: 'P_o0i9u8y7t6r5E$',
  role: 'employee'
};

// Login for protected route
const loginEmployer = {
  username: 'testEmployee',
  password: 'P_o0i9u8y7t6r5E$'
};

// A test prospect to test insert and add
const testProspect = {
  name: 'Test Prospect',
  email: 'Test@jest.com',
  phone_number: '0000000000',
  job_title: 'Test',
  skills: 'Jest, Supertest',
  about_me: 'I am the first Test Prospect'
};

const anotherTestProspect = {
  name: 'Test Prospect 2',
  email: 'Tester@jester.com',
  phone_number: '0000000001',
  job_title: 'Tester',
  skills: 'Jest, Supertester',
  about_me: 'I am the first Test Prospecter'
};

// A test company
const testCompany = {
  company_name: 'Test Company',
  about_us: 'Super cool Test Company'
};

const anotherTestCompany = {
  company_name: 'Super Cool Company',
  about_us: 'Super cool company who does alot of jest testing'
};

// A test employee
const testEmployee = {
  username: 'testEmployee',
  password: 'pass123',
  role: 'employee'
};

// A test employer
const testEmployer = {
  username: 'testEmployer',
  password: 'pass123',
  role: 'employer'
};

const listing = {
  company: 1,
  position: 'Software Engineer in Test',
  req_skills: 'Jest, Supertest, BDD, TDD',
  bonus_skills: 'Ruby, Cucumber'
};

const listingUpdate = {
  company: 1,
  position: 'DevOps Engineer',
  req_skills: 'AWS, Docker, Kubernetes',
  bonus_skills: 'Linux'
};

module.exports = {
  loginUser,
  registerUser,
  registerEmployee,
  loginEmployee,
  registerEmployer,
  loginEmployer,
  testProspect,
  anotherTestProspect,
  testCompany,
  anotherTestCompany,
  testEmployer,
  testEmployee,
  listing,
  listingUpdate
};
