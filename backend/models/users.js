/*
Users table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");
var medias = require("../models/medias.js");
var userRoles = require("../models/userRoles.js");

// Model
const users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.INTEGER,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

// Foreign key
users.belongsTo(medias, {foreignKey: 'avatar'});
users.belongsTo(userRoles, {foreignKey: 'role'});

module.exports = users;