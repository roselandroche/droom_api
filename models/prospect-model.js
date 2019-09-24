const db = require('../database/dbConfig.js');

module.exports = {
  get
};

async function get(table) {
  return db.select('*').from(table);
}
