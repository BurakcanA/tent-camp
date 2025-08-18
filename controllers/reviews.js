const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.new = async (req, res) => {
    const review = new Review(req.body.review)
    review.author = req.user._id
    await review.save()
    req.flash('success','New Review Succesfully added')
    const campground = await Campground.findByIdAndUpdate(req.params.id, {$push: {reviews: review}})
    res.redirect(`/campgrounds/detail/${campground._id}`)
}

module.exports.delete = async (req,res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','Review Successfuly deleted')
    res.redirect(`/campgrounds/detail/${id}`)
}