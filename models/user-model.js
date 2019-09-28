const db = require('../database/dbConfig.js');

module.exports = {
  addUser,
  findById,
  findBy,
  getUsername,
  deleteAccount
};

// adds a user to the users table and returns that ID, that id is then fed
// into findByID to return the first user that matches the given ID
async function addUser(user) {
  const [id] = await db
    .from('users')
    .insert(user)
    .returning('id');
  return findById(id);
}

// returns the first user that matches the given ID
async function findById(id) {
  return db
    .select('*')
    .from('users')
    .where({ id })
    .first();
}

// returns the first user that match the given filter
async function findBy(filter) {
  return db
    .select('*')
    .from('users')
    .where(filter)
    .first();
}

async function getUsername(username) {
  const [newUser] = await db
    .select('username')
    .from('users')
    .where({ username });
  return newUser ? newUser : null;
}

// deletes an account in users that matches the given ID
async function deleteAccount(id) {
  return db
    .select('*')
    .from('users')
    .where({ id })
    .del();
}
