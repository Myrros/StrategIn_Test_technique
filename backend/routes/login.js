const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router();

// We send our post request through our controller.
router.post('/', userCtrl.login);

module.exports = router;