/*
Connection to the database
*/

// Import

const Sequelize = require('sequelize');
const config = require('./config.json');

// Connection with Sequelize
const sequelize = new Sequelize(config.databaseConnect.database, config.databaseConnect.username, config.databaseConnect.password, {
  host: config.databaseConnect.host,
  dialect: config.databaseConnect.dialect, 
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
