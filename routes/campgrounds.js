const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const { isLoggedIn, validateCampgroundAsync, isAuthor } = require('../middlewares.js')
const Campground = require('../models/campground.js')
const catchAsync = require('../utils/catchAsync.js')


router.get('/', async (req, res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index.ejs', { campgrounds })
})

router.get('/new' , isLoggedIn, async (req, res) => {
    res.render('campgrounds/new.ejs')    
})

router.post('/', isLoggedIn, validateCampgroundAsync, catchAsync( async (req, res, next) => {
    req.body.campground.author = req.user._id;
    await Campground.insertOne(req.body.campground)
    req.flash('success', 'New Campground Succesfully Added!')
    res.redirect('./campgrounds')
}))

router.get('/detail/:id', catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author')
    if(!campground)
        {
            req.flash('error',`Sorry. Can't find the campground`)
            return res.redirect(`/campgrounds`)
        }
    res.render('campgrounds/detail.ejs', { campground })
}))

router.get('/edit/:id', isLoggedIn, isAuthor, catchAsync( async (req,res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground)
        {
            req.flash('error',`Sorry. Can't find the campground`)
            return res.redirect(`/campgrounds`)
        }
    res.render('campgrounds/edit.ejs', { campground })
}))

router.post('/edit/:id', isLoggedIn, isAuthor, validateCampgroundAsync, catchAsync( async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground)
    {
        req.flash('error',`Sorry. Can't find the campground`)
        return res.redirect(`/campgrounds`)
    }
    const newCampground = req.body.campground
    await Campground.findByIdAndUpdate(id, newCampground,{new:true})
    req.flash('success', 'Campground Succesfully Upgraded!')
    res.redirect(`/campgrounds/detail/${id}`)
}))

router.post('/delete/:id', isLoggedIn, isAuthor, catchAsync( async (req,res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground)
        {
            req.flash('error',`Sorry. Can't find the campground`)
            return res.redirect(`/campgrounds`)
        }
    await Campground.deleteOne({_id: campground._id})
    req.flash('success',`Succesfully Deleted`)
    res.redirect('/campgrounds')
}))

module.exports = router;