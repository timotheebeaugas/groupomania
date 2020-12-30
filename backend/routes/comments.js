/*
Comments routes
*/

// Import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const commentsCtrl = require('../controllers/comments')

// Routes
router.get('/post/:id',auth, commentsCtrl.getComments);
router.post('/:id',auth, commentsCtrl.sendComment);
router.delete('/',auth,admin, commentsCtrl.deleteComment);

module.exports = router;