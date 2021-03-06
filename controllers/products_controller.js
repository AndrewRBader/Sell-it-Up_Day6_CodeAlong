const express = require('express')
// import express to access Router function

const router = express.Router()
// creates an instance of the router 

/* 
    App Data:
    The products routes below accesses data from the 'products' array (DB) by its index value - we will use 'productId' as the param key.
*/

// MODELS
// from models directory, dont need index.js
const db = require('../models')


// express.Router breakdown 
// incoming request to: http://localhost:4000/products
// in server.js we have the following code - app.use('/products', products_controller)

// the products controller's express.Router will then take on processing the request: 

// app.use passes the request {} to the products_controller.js module
// the request evaluates the available routes in the module
// if a matching URL path is found, that route's callback is executed
// otherwise, the remaining routes in server.js (after the middleware) will execute


/*  Beginning of Products routes */

// get all products route
router.get('/', async (req, res, next) => {
    try {
        const products = await db.Product.find({});
        const context = { products }
        console.log(products);
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});


// Product "new" route - GET request- displays form for creating a new product

router.get('/new', (req, res) => {
    res.render('new.ejs')
})



// Products "show" route - GET request - display details about one product 
// http://localhost:4000/products/0

router.get('/:id/', async (req, res, next) => {
    try {
        const foundProduct = await db.Product.findById(req.params.id)
        // reviews to pass to template
        const allReviews = await db.Reviews.find({product: req.params.id})
        console.log(req.params.id);
        // set up context object with key contains the found product
        const context = {
            oneProduct: foundProduct,
            reviews: allReviews,    
        };
        // res.render the show.ejs file with context
        res.render('show.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// Products "edit" route - GET request - display an edit form for one product
// http://localhost:4000/products/0/edit

router.get('/:id/edit', async (req,res, next) => {
    try {
        // find product by id await function
        const updatedProduct = await db.Product.findById(req.params.id);
        //console log updated product
        console.log(updatedProduct);
        // context object of updated product
        const context = {
            product: updatedProduct
        }
        //res.render the edit.ejs file and context product
        return res.render('edit.ejs', context);
    } 
    catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// Product "index" route - GET request - displays all products
// http://localhost:4000/products

// router.get('/', (req, res) => {
//     // res.send(products)
//     const context = { products }
//     res.render('index', context)
// })



// Products "create" route - POST request -> request body (new product data)

// http://localhost:4000/products/

router.post('/', async(req, res, next) =>{
    try{
        console.log(req.body);
        //want to create a new req.body need await
        const createdProduct = await db.Product.create(req.body);
        //print out the created product (req.body)
        console.log(`created product: ${createdProduct}`);
        // redirect to the index products route
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})



// Products "destroy" route - DELETE request - removes data from products database and redirects to index route

// http://localhost:4000/products/0/ 

router.delete('/:id', async (req, res, next) => {
    try {
    const deletedProduct = await db.Product.findByIdAndDelete(req.params.id);
    // collect and delete all of the product's associated reviews
    const deletedReviews = await db.Reviews.deleteMany({product: req.params.id});
    console.log(deletedReviews);
    res.redirect('/products');
   } 
    catch (error) {
    console.log(error);
    req.error = error;
    return next();
   }
})





// Products "update" route - PUT request - update the Products array and redirects to show route
// http://localhost:4000/products/0/

router.put('/:id', async(req,res, next)=>{
    try {
        const updatedProduct = await db.Product.findByIdAndUpdate(req.params.id, req.body);
        //console.log updated product
        console.log(updatedProduct);
        // res redirect to the home index page
        return res.redirect(`/products/${updatedProduct._id}`);
    }
    catch (error){
        console.log(error);
        req.error = error;
        return next();
    }
})


module.exports = router