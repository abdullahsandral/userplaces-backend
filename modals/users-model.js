var sequelize = require('sequelize');
var db = require('../config/database-config');
var users = db.define('users', {
  U_ID: {
    type: sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  U_Name: {
    type: sequelize.STRING,
    allowNull: false
  },
  U_Email: {
    type: sequelize.STRING,
    allowNull: false
  },
  U_Password: {
    type: sequelize.STRING,
    allowNull: false
  },
  U_Image: {
    type: sequelize.STRING,
    allowNull: false
  },
  U_Places: {
    type: sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = users;
