const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync.js')
const User = require('../models/users.js')
const passport = require('passport')

router.get('/register' , (req,res) => {
    res.render('users/register.ejs')
})

router.post('/register' , catchAsync( async (req,res) => {
    try {
        const {username, email, password} = req.body
        const user = new User({username, email})
        const registeredUser = await User.register(user,password)
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success',`Welcome to Tent-Camp ${user.username}!`)
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.messagge)
        res.redirect('/login')
    }
}))

router.get('/login', (req,res) => {
    res.render('users/login.ejs')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect:'/user/login'}), (req,res) => {
    req.flash('success', `Welcome Back ${req.body.username}`)
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req,res,next) => {
    req.logOut((err) => {
        if (err) 
        {
            return next(err)
        }
        req.flash('success','Good Bye!')
        res.redirect('/campgrounds')
    })
})
module.exports = router;