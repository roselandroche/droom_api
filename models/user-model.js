const db = require('../database/dbConfig.js');

module.exports = {
  addUser,
  findById,
  findBy,
  deleteAccount
};

async function addUser(user) {
  const [id] = await db
    .from('users')
    .insert(user)
    .returning('id');
  return findById(id);
}

async function findById(id) {
  return db
    .select('*')
    .from('users')
    .where({ id })
    .first();
}

async function findBy(filter) {
  return db
    .select('*')
    .from('users')
    .where(filter)
    .first();
}

async function deleteAccount(id) {
  return db
    .select('*')
    .from('users')
    .where({ id })
    .del();
}
