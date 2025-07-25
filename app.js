const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const app = express()
const ExpressError = require('./utils/ExpressError.js');
const Review = require('./models/review.js')
const campgrounds = require('./routes/campgrounds.js')
const reviews = require('./routes/reviews.js')

app.set('view engne','ejs')
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate)
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
//Routes
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Tent-Camp')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

app.get('/home', (req, res) => {s
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