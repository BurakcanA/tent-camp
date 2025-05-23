const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const Campground = require('./models/campground.js')

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Tent-Camp')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

app.set('view engne','ejs')
app.set('views',path.join(__dirname,'views'))

// app.use(express.urlencoded({extended: true}))

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

app.get('/campgrounds/edit/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit.ejs')
})

app.get('/campgrounds/detail/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/detail.ejs', { campground })
})

app.listen('3000', () => {
    console.log('Local Host 3000 is listening')
})