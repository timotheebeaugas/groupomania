/*
Posts table model
*/

// Import
var Sequelize = require('sequelize');
var sequelize = require("../connectMysql");
var users = require("../models/users.js");
var postCategory = require("../models/postCategory.js");
var medias = require("../models/medias.js");
var comments = require("../models/comments.js");

// Model
const posts = sequelize.define('posts', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE, defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  category: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  media: {
    type: Sequelize.INTEGER,
  },
  text: {
    type: Sequelize.STRING,
  },
});

// Foreign key
posts.belongsTo(comments, {foreignKey: 'id', targetKey: 'postId'});
posts.belongsTo(users, {foreignKey: 'author'});
posts.belongsTo(postCategory, {foreignKey: 'category'});
posts.belongsTo(medias, {as: 'medias', foreignKey: 'media'}); 

 
module.exports = posts;