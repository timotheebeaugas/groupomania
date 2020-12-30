/*
Categorys routes
*/

// Import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const categorysCtrl = require('../controllers/categorys')

// Routes
router.get('/',auth, categorysCtrl.getCategorys);
router.post('/',auth,admin, categorysCtrl.creatCategory);

module.exports = router;