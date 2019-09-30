const db = require('../database/dbConfig.js');

module.exports = {
  addProfile,
  getProspects,
  getID,
  singleProspect,
  updateProfile
};

// adds a prospect to the prospects table and explicitly returns the given data
async function addProfile(data) {
  const [prospect] = await db
    .from('prospect')
    .insert(data)
    .returning('*');
  return prospect;
}

// returns all prospects
async function getProspects() {
  return db.select('*').from('prospect');
}

// Returns either an ID matching the employee ID from a given token or null
async function getID(id) {
  const [userID] = await db
    .select('id')
    .from('employee')
    .where({ id });
  return userID ? userID : null;
}

// returns a single prospect that matches the given ID
async function singleProspect(id) {
  const [prospect] = await db
    .select('*')
    .from('prospect')
    .where({ id });
  return prospect;
}

// updates a prospect matching the given ID with the given post
async function updateProfile(id, post) {
  const [prospect] = await db
    .from('prospect')
    .where({ id })
    .update(post)
    .returning('*');
  return prospect;
}
