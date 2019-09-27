const db = require('../database/dbConfig.js');

module.exports = {
  addListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
};

async function addListing(post) {
  const [listing] = await db
    .from('listings')
    .insert(post)
    .returning('*');
  return listing;
}

async function getListings() {
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

async function getListing(id) {
  return db
    .select('*')
    .from('listings')
    .where({ id })
    .first();
}

async function updateListing(id, post) {
  const [listing] = await db
    .from('listings')
    .where({ id })
    .update(post)
    .returning('*');
  return listing;
}

async function deleteListing(id) {
  return db
    .select('*')
    .from('listings')
    .where({ id })
    .del();
}
