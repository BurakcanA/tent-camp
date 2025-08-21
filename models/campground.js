const mongoose = require('mongoose') 
const Review = require('./review.js')

const camgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,  
    images: [
        {
            url: String,
            filename: String,
        }
    ],
    author: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

camgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc)
    {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
        console.log('Deleted!!!')
    }
})

module.exports = mongoose.model('Campground' , camgroundSchema)