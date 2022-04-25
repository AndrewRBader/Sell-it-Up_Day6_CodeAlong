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
    res.send('hitting review new')
})

// create
router.post('/', async(req, res, next) =>{
    res.send('hitting review create')
})

// show
router.get('/:reviewId', async(req, res, next) =>{
    res.send('hitting review show: ' +req.params.reviewId);
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