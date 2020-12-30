/*
Medias table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");

//model
const medias = sequelize.define('medias', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
});

module.exports = medias;