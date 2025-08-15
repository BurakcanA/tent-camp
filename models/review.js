const { types } = require('joi')
const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model('Review', new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}))