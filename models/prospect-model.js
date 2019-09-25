const db = require('../database/dbConfig.js');

module.exports = {
  getCompanies,
  addProfile,
  singleCompany
};

async function getCompanies() {
  return db.select('*').from('employer');
}

async function addProfile(data) {
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
