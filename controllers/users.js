const User = require('../models/user')

module.exports.registerPage = (req,res) => {
    res.render('users/register.ejs')
}

module.exports.register = async (req,res) => {
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
}

module.exports.loginPage = (req,res) => {
    res.render('users/login.ejs')
}

module.exports.login = (req,res) => {
    req.flash('success', `Welcome Back ${req.body.username}`)
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logOut((err) => {
        if (err) 
        {
            return next(err)
        }
        req.flash('success','Good Bye!')
        res.redirect('/campgrounds')
    })
}