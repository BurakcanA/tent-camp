const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync.js')
const User = require('../models/user.js')
const passport = require('passport')
const users = require('../controllers/users.js')
const user = require('../models/user.js')

router.route('/register')
    .get(( users.registerPage ))
    .post(catchAsync( users.register ))

router.route('/login')
    .get(( users.loginPage ))
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect:'/user/login'}), ( users.login ))

router.get('/logout', ( users.logout ))

module.exports = router;