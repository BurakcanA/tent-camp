const mongoose = require('mongoose') 

module.exports = mongoose.model('Campground',new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    location: String,  
}))