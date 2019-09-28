const db = require('../database/dbConfig.js');

module.exports = {
  addListing,
  getListingsRaw,
  getListings,
  getListing,
  updateListing,
  deleteListing
};

// adds listing to listings table using the given post and explitly returns that post
async function addListing(post) {
  const [listing] = await db
    .from('listings')
    .insert(post)
    .returning('*');
  return listing;
}

// returns all listings from the listings table
async function getListingsRaw() {
  return db.select('*').from('listings');
}

// returns listings after joining the employers table using a join,
// important note --- returns the company_name instead of the ID used to post a listing
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

// returns a single listing using a given ID
async function getListing(id) {
  return db
    .select('*')
    .from('listings')
    .where({ id })
    .first();
}

// updates a listing that matches an ID using a given post and returns that post
async function updateListing(id, post) {
  const [listing] = await db
    .from('listings')
    .where({ id })
    .update(post)
    .returning('*');
  return listing;
}

// deletes a listing that matches the given ID
async function deleteListing(id) {
  return db
    .select('*')
    .from('listings')
    .where({ id })
    .del();
}
