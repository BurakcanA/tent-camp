const ExpressError = require('./utils/ExpressError.js')
const Campground = require('./models/campground.js')
const Review = require('./models/review.js')
const { campgroundJoiSchema, reviewJoiSchema } = require('./schemas.js')

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must sign in first!');
        return res.redirect('/user/login')
    }
    next();
}

module.exports.validateCampgroundAsync = async (req,res,next) => {
    const { error } = campgroundJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id))
    {
        req.flash('error',`You don't have a permission for that`)
        return res.redirect(`/campgrounds/detail/${id}`)
    }
    next();
}

module.exports.isAuthorReview = async (req,res, next) => {
    const { reviewId } = req.params
    const review = await Review.findById(id)
    if(!review.author.equals(req.user._id))
    {
        req.flash('error',`You don't have a permission for that`)
        return res.redirect(`/campgrounds/detail/${id}`)
    }
    next();
}

module.exports.validateReviewAsync = async (req,res,next) => {
    const { error } = reviewJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    } else {
        next();
    }
}

