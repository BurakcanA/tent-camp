const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground.js')
const Review = require('../models/review.js')
const { validateReviewAsync, isLoggedIn } = require('../middlewares.js')
const ExpressError = require('../utils/ExpressError.js')
const catchAsync = require('../utils/catchAsync.js')
const reviews = require('../controllers/reviews.js')

router.post('/', isLoggedIn, validateReviewAsync, catchAsync( reviews.new ))

//Delete You can use method_override for better read
router.post('/:reviewId', isLoggedIn, catchAsync( reviews.delete))

module.exports = router;