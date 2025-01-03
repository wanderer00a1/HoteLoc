const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
    title: String,
    image: String,
    description:String,
    price: Number,
    location: String
})

module.exports = mongoose.model('Hotel', HotelSchema)