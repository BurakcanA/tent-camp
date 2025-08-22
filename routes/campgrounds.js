const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const { isLoggedIn, validateCampgroundAsync, isAuthor } = require('../middlewares.js')
const multer = require('multer')
const { storage } = require('../cloudinary/')
const upload = multer({ storage })
const Campground = require('../models/campground.js')
const catchAsync = require('../utils/catchAsync.js')
const campgrounds = require('../controllers/campgrounds.js')

router.get('/new' , isLoggedIn, ( campgrounds.newPage ))

router.route('/')
    .get(( campgrounds.all ))
    .post(isLoggedIn, upload.array('image'), validateCampgroundAsync, catchAsync( campgrounds.new ))

router.route('/edit/:id')
    .get(isLoggedIn, isAuthor, catchAsync( campgrounds.editPage ))
    .post(isLoggedIn, isAuthor, upload.array('image'), validateCampgroundAsync, catchAsync( campgrounds.edit ))

router.get('/detail/:id', catchAsync( campgrounds.detail ))

router.post('/delete/:id', isLoggedIn, isAuthor, catchAsync( campgrounds.delete ))

module.exports = router;