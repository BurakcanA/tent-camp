const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('Review', new Schema({
    body: String,
    rating: Number,
}))