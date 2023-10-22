//Connect DB
const Sequelize = require('sequelize');

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;
module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_URL,
  dialect: 'mysql',
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
