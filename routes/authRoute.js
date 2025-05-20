const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../config/db');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.use();

module.exports = router;