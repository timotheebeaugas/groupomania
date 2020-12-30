/*
Posts routes
*/

// Import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/admin');

const postCtrl = require('../controllers/posts')

// Routes
router.get('/count',auth, postCtrl.pageCount);
router.get('/page/:id',auth, postCtrl.getPosts);
router.get('/:id',auth, postCtrl.getPost);
router.post('/',auth,multer, postCtrl.sendPost);
router.post('/edit/:id',auth, postCtrl.editPost);
router.delete('/',auth,admin, postCtrl.deletePost);
  
module.exports = router;