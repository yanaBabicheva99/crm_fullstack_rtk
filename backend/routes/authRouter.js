const express = require('express');
const controller = require('../controllers/authController');
const passport = require("passport");
const router = express.Router();

//localhost:5000/api/auth/login
router.post('/login', controller.login);
//localhost:5000/api/auth/register
router.post('/register', controller.register);

router.get('/get', passport.authenticate('jwt', {session: false}), controller.getUser);

module.exports = router;