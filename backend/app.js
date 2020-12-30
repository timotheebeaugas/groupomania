/*
Main application file
*/

// Import
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); 

const usersCategorys = require('./routes/categorys.js');
const usersRoutes = require('./routes/users.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require('./routes/comments.js');
const mediasRoutes = require('./routes/medias.js');

// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Body parser
app.use(bodyParser.json());

// Routes
app.use('/categorys', usersCategorys);
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);
app.use('/medias', mediasRoutes);

// Static files
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

