/*
Posts category management
*/

// Import
var categorys = require("../models/postCategory.js");

// Find all categorys
exports.getCategorys = (req, res, next) => { 
  categorys.findAll()
  .then(categorys => {
    return res.send(categorys);
  })
  .catch(error => res.status(500).json({ error }));
};

// Creat a new cetagory
exports.creatCategory = (req, res, next) => {
  categorys.create({ category: req.body.categoryName })
  .then(categorys => {
    return res.status(200).json('Category successfully created');
  })
  .catch(error => res.status(500).json({ error }));
};