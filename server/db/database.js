const dbConfig = require('../db.config')
const { Pool } = require('pg');

const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
});

module.exports = pool;