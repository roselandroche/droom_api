const db = require('../database/dbConfig.js');

module.exports = {
  addProfile,
  getCompanies,
  singleCompany,
  updateProfile
};

async function addProfile(data) {
  const [company] = await db
    .from('employer')
    .insert(data)
    .returning('*');
  return company;
}

async function getCompanies() {
  return db.select('*').from('employer');
}

async function singleCompany(id) {
  const [company] = await db
    .select('*')
    .from('employer')
    .where({ id });
  return company;
}

async function updateProfile(id, post) {
  const [company] = await db
    .from('employer')
    .where({ id })
    .update(post)
    .returning('*');
  return company;
}
