const Campground = require('../models/campground')

module.exports.all = async (req, res) => {
    const campgrounds = await Campground.find()
    res.render('campgrounds/index.ejs', { campgrounds })
}

module.exports.newPage = async (req, res) => {
    res.render('campgrounds/new.ejs')    
}

module.exports.new = async (req, res, next) => {
    req.body.campground.author = req.user._id;
    const { campground } = req.body
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))
    console.log(campground)
    await Campground.insertOne(req.body.campground)
    req.flash('success', 'New Campground Succesfully Added!')
    res.redirect('./campgrounds')
}

module.exports.detail = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if(!campground)
        {
            req.flash('error',`Sorry. Can't find the campground`)
            return res.redirect(`/campgrounds`)
        }
    res.render('campgrounds/detail.ejs', { campground })
}

module.exports.editPage = async (req,res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground)
        {
            req.flash('error',`Sorry. Can't find the campground`)
            return res.redirect(`/campgrounds`)
        }
    res.render('campgrounds/edit.ejs', { campground })
}

module.exports.edit = async (req, res) => {
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
}

module.exports.delete = async (req,res) => {
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
}