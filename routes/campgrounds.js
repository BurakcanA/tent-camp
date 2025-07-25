const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const Campground = require('../models/campground.js')
const catchAsync = require('../utils/catchAsync.js')
const ExpressError = require('../utils/ExpressError.js')
const { campgroundJoiSchema } = require('../schemas.js')

const validateCampgroundAsync = async (req,res,next) => {
    const { error } = campgroundJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next()
    }
}

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index.ejs', { campgrounds })
})

router.get('/new' , async (req, res) => {
    res.render('campgrounds/new.ejs')    
})

router.post('/', validateCampgroundAsync, catchAsync( async (req, res, next) => {
    await Campground.insertOne(req.body.campground)
    req.flash('success', 'New Campground Succesfully Added!')
    res.redirect('./campgrounds')
}))

router.get('/detail/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    res.render('campgrounds/detail.ejs', { campground })
})

router.get('/edit/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit.ejs', { campground })
})

router.post('/edit/:id', validateCampgroundAsync, catchAsync( async (req, res) => {
    const { id } = req.params
    const campground = req.body.campground
    await Campground.findByIdAndUpdate(id, campground,{new:true})
    req.flash('success', 'Campground Succesfully Upgraded!')
    res.redirect(`/campgrounds/detail/${id}`)
}))

router.post('/delete/:id', async (req,res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
        .then(data => console.log(`Deleted,${data}`))
        .catch(err => console.log(`Failed ${err}`))
    res.redirect('/campgrounds')
})

module.exports = router;