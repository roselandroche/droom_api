const db = require('../database/dbConfig.js');

module.exports = {
  addProfile,
  getCompanies,
  singleCompany,
  updateProfile
};

// adds a profile with the given data and returns that post
async function addProfile(data) {
  const [company] = await db
    .from('employer')
    .insert(data)
    .returning('*');
  return company;
}

// returns all companies from the employers table
async function getCompanies() {
  return db.select('*').from('employer');
}

// returns a single company with the given ID
async function singleCompany(id) {
  const [company] = await db
    .select('*')
    .from('employer')
    .where({ id });
  return company;
}

// updates a profile that matches the given ID with the given post, returns that post
async function updateProfile(id, post) {
  const [company] = await db
    .from('employer')
    .where({ id })
    .update(post)
    .returning('*');
  return company;
}
