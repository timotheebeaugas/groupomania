/*
User management
*/

// import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var users = require("../models/users.js");
var medias = require("../models/medias.js");
const config = require('../config.json');
const fs = require('fs');

// Create a new user
exports.createUser = (req, res, next) => {
  if (req.body.password.length < 6) {
    return res.status(400).json({error : 'Too short password !'});
  }
  users.create({ role:"2", username: req.body.username, avatar: "200", password: bcrypt.hashSync(req.body.password, 10) }) 
  .then(users => {
    return res.status(200).json('User account created.');
  })
  .catch(error => res.status(500).json({ error }));
};

// Find all users
exports.getUsers = (req, res, next) => {
  users.findAll()
  .then(users => {
    return res.status(200).json(users);
  })
  .catch(error => res.status(500).json({ error }));
};

// Find one user with his avatar
exports.getUser = (req, res, next) => {
  users.findOne({attributes: ['id','username'], where: {id: req.params.id }, include: {model: medias, attributes: ['name']}})
  .then(users => {
    return res.status(200).json(users);
  })
  .catch(error => res.status(500).json({ error }));
};

// Authentification
exports.authentification = (req, res, next) => {
  users.findOne({where: {username: req.body.username }})
  .then(users => {
    if (!users) {
        return res.status(401).json({ error: 'User not found !' });
    }
    bcrypt.compare(req.body.password, users.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password !' });
          }
          res.status(200).json({
              userId: users.id,
              userRole: users.role,
              token: jwt.sign(
                { userId: users.id,
                userRole: users.role},
                config.tokenSecretKey,
                { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Delete one user and his avatar
exports.deletedUser = (req, res, next) => {
  users.findOne({where: {id: req.body.userId}})
  .then(user => {
    const userAvatarId = user.avatar;
    users.destroy({where: {id: req.body.userId }})
    .then(users => {
      if (!users) {
        return res.status(404).json({ error: 'Users not found !' });
      }
      return res.status(200).json(users);
    })
    .catch(error => res.status(500).json({ error }));
      if(userAvatarId!=200){
      medias.findOne({where: {id: userAvatarId }})
        .then(mediasFindPromise => {
          filename = JSON.stringify(mediasFindPromise.name).split('/images/')[1];
          filename2 = filename.split('"')[0];
          fs.unlink(`images/${filename2}`, (err) => {
            medias.destroy({where: {id: userAvatarId }})
            .then(mediasDestroyPromise => {
              return res.status(200).json(mediasDestroyPromise);
            });
          });
        });
      }
  })
  .catch(error => res.status(500).json({ error }));
};

// Add a new moderator
exports.upgradeUser = (req, res, next) => {
  users.findOne({where: {username: req.body.UpgradeByUsername}})
  .then(users => {
    if (!users) {
        return res.status(401).json({ error: 'User not found !' });
    }else{
        users.update({ role: "1" }, {where: {username: req.body.UpgradeByUsername}})
      .then(user => {
        return res.status(200).json('User updated');
      })
      .catch(error => res.status(500).json({ error }));
    }
  })
  .catch(error => res.status(500).json({ error }));
};
