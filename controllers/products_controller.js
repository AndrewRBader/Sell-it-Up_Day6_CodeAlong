const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

/* 
    App Data:
    The products routes below accesses data from the 'products' array (DB) by its index value - we will use 'productId' as the param key.
*/

// MODELS
const products = require('../models/product_model')


// express.Router breakdown 
// incoming request to: http://localhost:4000/products
// in server.js we have the following code - app.use('/products', products_controller)

// the products controller's express.Router will then take on processing the request: 

// app.use passes the request {} to the products_controller.js module
// the request evaluates the available routes in the module
// if a matching URL path is found, that route's callback is executed
// otherwise, the remaining routes in server.js (after the middleware) will execute


/*  Beginning of Products routes */

// Product "new" route - GET request- displays form for creating a new product

router.get('/new', (req, res) => {
    res.render('new.ejs')
})



// Products "show" route - GET request - display details about one product 
// http://localhost:4000/products/0

router.get('/:id/', (req, res) => {
    let productId = req.params.id

    const context = {
        oneProduct: products[productId],
        message: 'I am the show route',
        id: productId
    }
    res.render('show.ejs', context)
})



// Products "edit" route - GET request - display an edit form for one product
// http://localhost:4000/products/0/edit

router.get('/:id/edit', (req,res)=>{
    const foundProduct = products[req.params.id]
    const context = {
        product: foundProduct,
        id: req.params.id
    }
    res.render('edit.ejs', context)
})



// Product "index" route - GET request - displays all products
// http://localhost:4000/products

router.get('/', (req, res) => {
    // res.send(products)
    const context = { products }
    res.render('index', context)
})



// Products "create" route - POST request -> request body (new product data)

// http://localhost:4000/products/

router.post('/', (req, res) => {
    
    products.push(req.body)
    res.redirect('/products')
})



// Products "destroy" route - DELETE request - removes data from products database and redirects to index route

// http://localhost:4000/products/0/ 

router.delete('/:id', (req,res)=>{
    // remove a value from an array at a given index 
    products.splice(req.params.id , 1 )
    // notes on splice - https://www.w3schools.com/jsref/jsref_splice.asp
    
    // res.status(200).send(`current products remaining: ${products.length}`) >> testing the updated product length(quantity of products)

    res.redirect('/products')

})



// Products "update" route - PUT request - update the Products array and redirects to show route
// http://localhost:4000/products/0/

router.put('/:id', (req,res)=>{
    // res.send(req.body)
    // assumptions: - have data, have id
    // update the products with the new data
    products[req.params.id] = req.body

    // take the user 'back' to the show route for that product
    res.redirect(`/products/${req.params.id}`)
})


module.exports = router