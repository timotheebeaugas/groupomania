/*
User avatar management
*/

// import
var medias = require("../models/medias.js");
var users = require("../models/users.js");
const fs = require('fs');

// Change avatar, delete the old and recover the new
exports.sendMedia = (req, res, next) => {
  users.findOne({where: {id: req.body.user}})
  .then(user => {
    const userAvatarId = user.avatar;
    if(userAvatarId != 200){
      medias.findOne({where: {id: user.avatar }})
        .then(mediasFindPromise => {
          filename = JSON.stringify(mediasFindPromise.name).split('/images/')[1];
          filename2 = filename.split('"')[0];
          fs.unlink(`images/${filename2}`, (err) => {
              medias.create({ name: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date: new Date() })
              .then(media => {
                users.update({ avatar: media.id }, {where: {id: req.body.user}})
                  .then(user => {
                  users.findOne({attributes: ['id','username'], where: {id: req.body.user }, include: {model: medias, attributes: ['name']}})
                  .then(user => {
                    medias.destroy({where: {id: userAvatarId }})
                    .then(mediasDestroyPromise => {
                      return res.status(200).json(user);
                  });
                });
              });
            });
          });
        });
    }else{
      medias.create({ name: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date: new Date() })
      .then(media => {
        users.update({ avatar: media.id }, {where: {id: req.body.user}})
        .then(user => {
          users.findOne({attributes: ['id','username'], where: {id: req.body.user }, include: {model: medias, attributes: ['name']}})
          .then(user => {
            return res.status(200).json(user);
          });
        });
      });
    }
  })
  .catch(error => res.status(500).json({ error }));
}; 


  

