/*
Categorys routes
*/

// Import
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const usersCtrl = require('../controllers/users')

// Routes
router.get('/',auth, usersCtrl.getUsers);
router.get('/:id',auth, usersCtrl.getUser);
router.post('/', usersCtrl.createUser);
router.post('/login', usersCtrl.authentification);
router.delete('/',auth, usersCtrl.deletedUser);
router.post('/role',auth,admin, usersCtrl.upgradeUser);


module.exports = router;