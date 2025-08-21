if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const ExpressError = require('./utils/ExpressError.js');
const ejsMate = require('ejs-mate') // Packages
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const Review = require('./models/review.js') //Models
const User = require('./models/user.js')
const campgroundRoutes = require('./routes/campgrounds.js') // Routes
const reviewRoutes = require('./routes/reviews.js')
const userRoutes = require('./routes/users.js')

const sessionConfig = {
    secret: 'DONTSHARETHIS',
    resave: false,
    saveUninitialized: true,
    cookies: {
        htppOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.set('view engne','ejs')
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate)
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
//Routes
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/user', userRoutes)

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Tent-Camp')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

app.get('/home', (req, res) => {
    res.send('WELCOME TO TENT CAMP!')
})

app.all(/(.*)/, (req,res,next) => {
    next(new ExpressError(404, 'Page Not Found'))
})

app.use((err,req,res,next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs', { err })
})

app.listen('3000', () => {
    console.log('Local Host 3000 is listening')
})