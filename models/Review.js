// import mongoose
const mongoose = require('mongoose');

// set up reviewsSchema with mongoose
const reviewSchema = new mongoose.Schema({
    //set up for rating
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    content: {
        type: String,
        required: [true, 'please add content']
    },
    product: {
        // type configures 'product' field to only store object ids
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }
}, 
{timestamps: true})

//model of reviews schema
const Review = mongoose.model("Review", reviewSchema);
//export the model
module.exports = Review;
