/*
Posts management
*/

// import
var posts = require("../models/posts.js");
var users = require("../models/users.js");
var userRoles = require("../models/userRoles.js");
var postCategory = require("../models/postCategory.js");
var medias = require("../models/medias.js");
var comments = require("../models/comments.js");
var sequelize = require("../connectMysql");
const fs = require('fs');

// Find total post count for pagination
exports.pageCount = (req, res, next) => {
  posts.findAndCountAll({attributes: [sequelize.fn('count', sequelize.col('id'))]})
  .then(posts => {
    return res.send(posts);
  })
  .catch(error => res.status(500).json({ error }));
};

// Find all posts by page selected
exports.getPosts = (req, res, next) => { 
  posts.findAll({ 
    include: [
      {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]},
      {model: medias, as: 'medias', attributes: ['name']},
      {model: postCategory, attributes: ['category']},
      {model: comments,  attributes: ['postId', [sequelize.fn('count', sequelize.col('postId')), 'count']]}
    ],
    group: "posts.id", 
    offset: (10*req.params.id)-10, 
    limit: 10, 
    order: [['id', 'DESC']],
  })
  .then(posts => {
    return res.send(posts);
  })
  .catch(error => res.status(500).json({ error }));
}; 

// Find one post
exports.getPost = (req, res, next) => {
  posts.findAll({ 
    include: [
      {model: users, attributes: ['id','username']}, 
      {model: postCategory, attributes: ['category']}, 
      {model: medias, as: 'medias', attributes: ['name']}, 
      {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]}
    ], 
    where: {id: req.params.id}
  })
  .then(posts => {
    return res.send(posts);
  })
  .catch(error => res.status(500).json({ error }));
};

// Send a new post and recover the list of updated messages
exports.sendPost = (req, res, next) => {
  if(req.file != null){
    medias.create({ name: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date: new Date() }) 
    .then(media => {
      return posts.create({ author:req.body.user, category: req.body.category, media: media.id, text: req.body.message })
    })
    .then(post => {
      return posts.findAll({ 
        include: [
          {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]},
          {model: medias, as: 'medias', attributes: ['name']},
          {model: postCategory, attributes: ['category']},
          {model: comments,  attributes: ['postId', [sequelize.fn('count', sequelize.col('postId')), 'count']]}
        ],
      group: "posts.id", 
      offset: (10*1)-10, limit: 10, order: [['id', 'DESC']] })
    })
    .then(posts => {
      return res.send(posts);
    })
    .catch(error => res.status(500).json({ error }));
  }else{   
    posts.create({ author:req.body.user, category: req.body.category, media: null, text: req.body.message })
    .then(post => {
      posts.findAll({ 
        include: [
          {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]},
          {model: medias, as: 'medias', attributes: ['name']},
          {model: postCategory, attributes: ['category']},
          {model: comments,  attributes: ['postId', [sequelize.fn('count', sequelize.col('postId')), 'count']]}
        ],
        group: "posts.id", 
        offset: (10*1)-10, limit: 10, order: [['id', 'DESC']] 
      })
      .then(posts => {
        return res.send(posts);
      })
      .catch(error => res.status(500).json({ error }));
  });
  }
  
};

// Update one post and recover updated version
exports.editPost = (req, res, next) => {
  posts.update({ text: req.body.message, category: req.body.category }, {where: {id: req.params.id}})
  .then(post => {
    posts.findAll({ 
      include: [
        {model: users, attributes: ['id','username']}, 
        {model: postCategory, attributes: ['category']}, 
        {model: medias, as: 'medias', attributes: ['name']}, 
        {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]}
      ], 
      where: {id: req.params.id}
    })
    .then(posts => {
      return res.send(posts);
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

// Delete one post and his image (if she exists)
exports.deletePost = (req, res, next) => {
  posts.findOne({where: {id: req.body.PostID}})
  .then(post => {
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if(post.media===null){
      posts.destroy({where: {id: req.body.PostID}})
      .then(postDestroyPromise => {
        if (!postDestroyPromise) {
          return res.status(404).json({ error: 'Post not found' });
        }})
      .catch(error => res.status(500).json({ error })); 
    }else{
      posts.destroy({where: {id: req.body.PostID}})
      .then(posts => {
        if (!posts) {
          return res.status(404).json({ error: 'Post not found' });
        }
      })
      .catch(error => res.status(500).json({ error }));
      medias.findOne({where: {id: post.media }})
      .then(mediasFindPromise => {
        filename = JSON.stringify(mediasFindPromise.name).split('/images/')[1];
        filename2 = filename.split('"')[0];
        fs.unlink(`images/${filename2}`, (err) => {
          medias.destroy({where: {id: post.media }})
          .then(mediasDestroyPromise => {
            return res.status(200).json(mediasDestroyPromise);
          });
        });
      });
      res.status(200).json('Post deleted');
    }
    res.status(200).json('Post deleted');
  })
  .catch(error => res.status(500).json({ error }));
}; 

