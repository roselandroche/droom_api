const db = require('../database/dbConfig.js');

module.exports = {
  get,
  add,
  singleCompany
};

async function get() {
  return db.select('*').from('employer');
}

async function add(data) {
  const [prospect] = await db
    .from('prospect')
    .insert(data)
    .returning('*');
  return prospect;
}

async function singleCompany(id) {
  const [company] = await db
    .select('company_name', 'about_us')
    .from('employer')
    .where({ id });
  return company;
}

// function update(id, changes) {
//   return db('users')
//     .where({ id })
//     .update(changes);
// }

// function remove(id) {
//   return db('users')
//     .where('id', id)
//     .del();
// }
