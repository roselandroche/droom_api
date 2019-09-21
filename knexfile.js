require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {
  // Development/Prod Configuration
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DEV_USER,
      password: process.env.DEV_PW,
      database: 'droom_test'
    },
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    debug: true,
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }
};
