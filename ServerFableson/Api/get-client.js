const { Client } = require('pg');

require('dotenv').config();

module.exports.getClient = async () => {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: false,
  });
  await client.connect();
  return client;
};