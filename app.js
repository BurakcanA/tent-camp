const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const ejsMate = require('ejs-mate')
const app = express()
const Campground = require('./models/campground.js')
const catchAsync = require('./utils/catchAsync.js')
const ExpressError = require('./utils/ExpressError.js')
const { campgroundJoiSchema, reviewJoiSchema} = require('./schemas.js')
const Review = require('./models/review.js')

app.set('view engne','ejs')
app.set('views',path.join(__dirname,'views'))

app.engine('ejs',ejsMate)

app.use(express.urlencoded({extended: true}))

const validateCampgroundAsync = async (req,res,next) => {
    const { error } = campgroundJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next()
    }
}

const validateReviewAsync = async (req,res,next) => {
    const { error } = reviewJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next()
    }
}

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Tent-Camp')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

app.get('/home', (req, res) => {
    res.send('WELCOME TO TENT CAMP!')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index.ejs', { campgrounds })
})

app.get('/campgrounds/new' , async (req, res) => {
    res.render('campgrounds/new.ejs')    
})

app.post('/campgrounds', validateCampgroundAsync, catchAsync( async (req, res, next) => {
    await Campground.insertOne(req.body.campground)
    res.redirect('./campgrounds')
}))

app.get('/campgrounds/detail/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    console.log(campground)
    res.render('campgrounds/detail.ejs', { campground })
})

app.get('/campgrounds/edit/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit.ejs', { campground })
})

app.post('/campgrounds/edit/:id', validateCampgroundAsync, catchAsync( async (req, res) => {
    const { id } = req.params
    const campground = req.body.campground
    await Campground.findByIdAndUpdate(id, campground,{new:true})
    res.redirect(`/campgrounds/detail/${id}`)
}))

app.post('/campgrounds/delete/:id', async (req,res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
        .then(data => console.log(`Deleted,${data}`))
        .catch(err => console.log(`Failed ${err}`))
    res.redirect('/campgrounds')
})

app.post('/campgrounds/:id/reviews', validateReviewAsync, catchAsync(async (req, res) => {
    
    const review = new Review(req.body.review)
    await review.save()
    const campground = await Campground.findByIdAndUpdate(req.params.id, {reviews: review})
    console.log(review)
    res.redirect(`/campgrounds/detail/${campground._id}`)
}))

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