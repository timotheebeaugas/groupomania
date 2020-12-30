/*
Role table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");

// Model
const UserRoles = sequelize.define('userRoles', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = UserRoles;