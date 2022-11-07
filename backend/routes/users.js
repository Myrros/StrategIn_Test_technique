const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const router = express.Router();

// We make the 'get' request go through the authentification middleware before accessing our controller.
router.get('/', auth, userCtrl.users);

module.exports = router;