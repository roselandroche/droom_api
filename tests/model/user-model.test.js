const Users = require('../../models/user-model');
const db = require('../../database/dbConfig.js');
const constant = require('../constants');

describe('The Users Model', () => {
  const { testEmployee, testEmployer, badUser } = constant;
  beforeEach(async () => {
    await db('users').truncate();
  });

  test('should insert an employee', async () => {
    // Test Setup
    await Users.addUser(testEmployee);
    const users = await db('users');

    // Assertion
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('testEmployee');
    expect(users[0].password).toBe('pass123');
    expect(users[0].role).toBe('employee');
  });

  test('should insert an employer', async () => {
    // Test Setup
    await Users.addUser(testEmployer);
    const users = await db('users');

    // Assertion
    expect(users.length).toBe(1);
    expect(users[0].username).toBe('testEmployer');
    expect(users[0].password).toBe('pass123');
    expect(users[0].role).toBe('employer');
  });

  test('Should find an single user', async () => {
    // Test Setup
    await Users.addUser(testEmployee);

    // Assertion
    const user = await Users.findById(1);
    expect(user.username).toBe('testEmployee');
  });

  test('Should find an filtered user', async () => {
    // Test Setup
    const { username } = testEmployer;
    await Users.addUser(testEmployer);
    const user = await Users.findBy({ username });

    // Assertion

    expect(user.username).toBe(username);
  });
});
