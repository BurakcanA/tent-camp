const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground.js')
const Review = require('../models/review.js')
const ExpressError = require('../utils/ExpressError.js')
const catchAsync = require('../utils/catchAsync.js')
const { reviewJoiSchema } = require('../schemas.js')

const validateReviewAsync = async (req,res,next) => {
    const { error } = reviewJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next()
    }
}

router.post('/', validateReviewAsync, catchAsync(async (req, res) => {
    
    const review = new Review(req.body.review)
    await review.save()
    const campground = await Campground.findByIdAndUpdate(req.params.id, {$push: {reviews: review}})
    console.log(review)
    res.redirect(`/campgrounds/detail/${campground._id}`)
}))

//Delete You can use method_override for better read
router.post('/:reviewId', catchAsync( async (req,res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/campgrounds/detail/${id}`)
}))

module.exports = router;