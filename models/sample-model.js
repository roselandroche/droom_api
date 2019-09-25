const db = require('../database/dbConfig.js');

module.exports = {
  sampleAddUser,
  sampleFindBy,
  sampleFindById,
  sampleGet,
  add,
  sampleGetPosting
};

// Sets ID to await an insertion of a new user into the users DB then finds the user using the
// Given ID and returns it
async function sampleAddUser(user) {
  const [id] = await db
    .from('users')
    .insert(user)
    .returning('id');
  return sampleFindById(id);
}
// Using a given filter, filters users table and returns the filtered user
async function sampleFindBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

// Using a given ID, finds the ID within the users table and returns the first user found matching that ID
async function sampleFindById(id) {
  return db
    .select('*')
    .from('users')
    .where({ id })
    .first();
}

async function sampleGet(table) {
  return db.select('*').from(table);
}

async function sampleGetPosting() {
  // return db
  //   .select('e.company_name', 'l.position', 'l.req_skills', 'l.bonus_skills')
  //   .from('listings AS l')
  //   .join('employer AS e', 'e.id', 'l.company')
  //   .where('l.company', '=', 'e.id');
  return db('listings AS l')
    .join('employer AS e', 'l.company', '=', 'e.id')
    .select(
      'e.company_name',
      'e.about_us',
      'l.position',
      'l.req_skills',
      'l.bonus_skills'
    );
}

async function add(table, data) {
  const [item] = await db
    .from(table)
    .insert(data)
    .returning('*');
  return item;
}
