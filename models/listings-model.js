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
  return db.select('*').from('listings');
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
