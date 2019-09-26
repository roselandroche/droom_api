const db = require('../database/dbConfig.js');

module.exports = {
  addProfile,
  getProspects,
  singleProspect,
  updateProfile
};

async function addProfile(data) {
  const [prospect] = await db
    .from('prospect')
    .insert(data)
    .returning('*');
  return prospect;
}

async function getProspects() {
  return db.select('*').from('prospect');
}

async function singleProspect(id) {
  const [prospect] = await db
    .select('*')
    .from('prospect')
    .where({ id });
  return prospect;
}

async function updateProfile(id, post) {
  const [prospect] = await db
    .from('prospect')
    .where({ id })
    .update(post)
    .returning('*');
  return prospect;
}
