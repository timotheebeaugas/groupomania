/*
Medias routes
*/

// Import
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const mediaCtrl = require('../controllers/medias')

// Routes
router.post('/',auth, multer, mediaCtrl.sendMedia); 

module.exports = router;

