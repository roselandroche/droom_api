module.exports = {
  // Development/Prod Configuration
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DEV_USER,
      password: process.env.DEV_PW,
      database: 'droom_test'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    }
  }
};
