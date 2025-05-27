const mongoose = require('mongoose') 

module.exports = mongoose.model('Campground',new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,  
    image: String,
}))