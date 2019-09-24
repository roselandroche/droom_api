const db = require('../database/dbConfig.js');

module.exports = {
  get,
  add,
  single
};

async function get() {
  return db.select('*').from('prospect');
}

async function add(data) {
  const [prospect] = await db
    .from('prospect')
    .insert(data)
    .returning('*');
  return prospect;
}

async function single(id) {
  const [prospect] = await db
    .select('name', 'email', 'phone_number', 'job_title', 'skills', 'about_me')
    .from('prospect')
    .where({ id });
  return prospect;
}
