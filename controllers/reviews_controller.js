// import the express methods
const express = require('express');
// creates instance of the router
const router = express.Router();


// MODELS//
// from models directory, dont need index.js
const db = require('../models')

//Routes//
// index route
router.get('/', async(req, res, next) =>{
    res.send('hitting review index')
})

// new 
router.get('/new', async(req, res, next) =>{
    try {
        const allProducts = await db.Product.find({})
        console.log(allProducts)
        const context = {products: allProducts}
        res.render('reviews/new.ejs', context)

    } catch (err){
        console.log(error);
        req.erorr = error;
        return next();
    }
})

// create
router.post('/', async(req, res, next) =>{
    try{
        const newReviewData = req.body;
        const newReview = await db.Reviews.create(newReviewData);
        console.log(newReview);
        res.redirect('/reviews');
    } catch(err){
        console.log(error);
        req.error = error;
        return next();
    }
})

// show
router.get('/:reviewId', async(req, res, next) =>{
    // res.send('hitting review show: ' +req.params.reviewId);
    res.render('reviews/show.ejs');
})

// update - PUT route
router.put('/:reviewId', async(req, res, next) =>{
    res.send('hitting review update: ' +req.params.reviewId);
})

// edit
router.get('/:reviewId/edit', async(req, res, next) =>{
    res.send('hitting review edit: ' +req.params.reviewId);
})

// destroy - delete
router.delete('/:reviewId', async(req, res, next) =>{
    res.send('hitting review delete: ' +req.params.reviewId);
})


// exports the router
module.exports = router;