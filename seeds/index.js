const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/Tent-Camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) +10
        const camp = new Campground({
            author: '6894b8d19694403a13c4fd1b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum ut qui eum quo harum nobis voluptatibus officia eius, illo, aliquam corrupti quaerat mollitia, earum accusamus error voluptatem aperiam enim nemo.',
            images: [
            {
                url: 'https://res.cloudinary.com/dcvzhxvqh/image/upload/v1755872296/TentCamp/l5elyxlur3ug6hsccwjo.jpg',
                filename: 'TentCamp/l5elyxlur3ug6hsccwjo',
            },
            {
                url: 'https://res.cloudinary.com/dcvzhxvqh/image/upload/v1755676625/TentCamp/g8lu8gnwib25szhunzin.png',
                filename: 'TentCamp/g8lu8gnwib25szhunzin',
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})