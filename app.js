const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const Campground = require('./models/campground.js')

app.set('view engne','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended: true}))

const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/Tent-Camp')
db.on('error', err => console.log(`Connection Failed: ${err}`))
db.once('open',() => console.log('Database Connected!'))

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

app.post('/campgrounds', async (req, res) => {
    await Campground.insertOne(req.body.campground)
    .then(data => console.log(data))
    .catch(err => console.log(`Insert Failed ${err}`))
    res.redirect('./campgrounds')
})

app.get('/campgrounds/detail/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/detail.ejs', { campground })
})

app.get('/campgrounds/edit/:id', async (req,res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit.ejs', { campground })
})

app.post('/campgrounds/edit/:id', async (req, res) => {
    const { id } = req.params
    const campground = req.body.campground
    await Campground.findByIdAndUpdate(id, campground,{new:true})
        .then(data => console.log(`Success, Updated Data: ${data}`))
        .catch(err => console.log(`Failed : ${err}`))
    res.redirect(`/campgrounds/detail/${id}`)
})

app.post('/campgrounds/delete/:id', async (req,res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
        .then(data => console.log(`Deleted,${data}`))
        .catch(err => console.log(`Failed ${err}`))
    res.redirect('/campgrounds')
})

app.listen('3000', () => {
    console.log('Local Host 3000 is listening')
})