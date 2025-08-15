const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground.js')
const Review = require('../models/review.js')
const { validateReviewAsync, isLoggedIn } = require('../middlewares.js')
const ExpressError = require('../utils/ExpressError.js')
const catchAsync = require('../utils/catchAsync.js')

router.post('/', isLoggedIn, validateReviewAsync, catchAsync(async (req, res) => {
    const review = new Review(req.body.review)
    review.author = req.user._id
    await review.save()
    req.flash('success','New Review Succesfully added')
    const campground = await Campground.findByIdAndUpdate(req.params.id, {$push: {reviews: review}})
    res.redirect(`/campgrounds/detail/${campground._id}`)
}))

//Delete You can use method_override for better read
router.post('/:reviewId', isLoggedIn, catchAsync( async (req,res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/detail/${id}`)
}))

module.exports = router;