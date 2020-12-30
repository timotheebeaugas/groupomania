/*
Category table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");

// Model
const postCategory = sequelize.define('postCategory', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
},{
  freezeTableName: true,
});

module.exports = postCategory;