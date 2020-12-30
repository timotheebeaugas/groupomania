/*
Comment table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");
var users = require("../models/users.js");

// Model
const comments = sequelize.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE, defaultValue: Sequelize.NOW,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postId: {
    type: Sequelize.INTEGER,
  },
});

// Foreign key
comments.belongsTo(users, {foreignKey: 'author'});

module.exports = comments;