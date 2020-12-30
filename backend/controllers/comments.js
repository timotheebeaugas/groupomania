/*
Comments managment
*/

// Import
var comments = require("../models/comments.js");
var users = require("../models/users.js");
var medias = require("../models/medias.js");
var userRoles = require("../models/userRoles.js");

// Find all comments
exports.getComments = (req, res, next) => {
  comments.findAll({ 
    include: [
      {model: users, attributes: ['username']}, 
      {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]}
    ], 
    where: {postId: req.params.id},
    order: [
      ['id', 'ASC'],
    ]
  })
  .then(comments => {
    return res.send(comments);
  })
  .catch(error => res.status(500).json({ error }));
};

// Send a new comment and recover the list of updated messages
exports.sendComment = (req, res, next) => {
  comments.create({ author:req.body.user, text: req.body.message, postId: req.params.id })
  .then(comment => {
    comments.findAll({ 
      include: [
        {model: users, attributes: ['username']}, 
        {model: users, include: [{model: medias, attributes: ['name']}, {model: userRoles, attributes: ['role']}]}
      ], 
      where: {postId: req.params.id },
      order: [
        ['id', 'ASC'],
      ]
    })
    .then(comments => {
      return res.send(comments);
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

// Delete one comment
exports.deleteComment = (req, res, next) => {
  comments.destroy({where: {id: req.body.CommentID}})
  .then(comments => {
    if (!comments) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    return res.status(200).json('Comment deleted');
  })
  .catch(error => res.status(500).json({ error }));
};
