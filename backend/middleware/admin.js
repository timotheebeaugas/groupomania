/*
Admin authentication middleware
*/

// import
const jwt = require('jsonwebtoken');
const config = require('../config.json');

// User role verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.tokenSecretKey); 
    const userRole = decodedToken.userRole;
    if (1 !== userRole) {
      throw 'Invalid user Role';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};