// require mongoose in products.js
const mongoose = require('mongoose');

//product constructor schema
const productSchema = new mongoose.Schema({
    //product name
    name: {
        type: String,
        //make name required
        required: [true, 'name cannot be empty']
    },
    //price has to be greater than 0
    price: {
        type: Number,
        min: [0, 'non negative number'],
        //also require a price for every object
        required: [true, 'need a price']
    },
    image: {
        //url is a string
        type: String,
        required: [true, 'need an image url']
    },
    timestamps: true
})

//mongoose.model instance of schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
// we will access the array data through our 'database'
// without our module.exports we would not be able to access data from this file