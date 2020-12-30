/*
User authentication middleware
*/

// import
const jwt = require('jsonwebtoken');
const config = require('../config.json');

// User ID verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.tokenSecretKey); 
    const userId = decodedToken.userId;
    const userIdBody = parseInt(req.body.userId);
    if (req.body.userId && userIdBody !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};