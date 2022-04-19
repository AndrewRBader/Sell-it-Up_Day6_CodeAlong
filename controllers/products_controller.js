const express = require('express')

const router = express.Router()


// MODELS
const products = require('../models/product_model')

// express.Router:
// intercept request & 'routes them to a new location'
console.log('products controller is working')
// request http://localhost:4000/products
// server js - express router >>>
// products_controller.js >> handle all products
// if there is no match, it will continue back to remaining routes in server.js

// Product "new" route - GET - serves template with form for creating a new product

router.get('/new', (req, res) => {
    res.render('new.ejs')
})


// Products "show" route - GET - one product 

router.get('/:id/', (req, res) => {
    let productId = req.params.id

    const context = {
        oneProduct: products[productId],
        message: 'I am the show route',
        id: productId
    }
    res.render('show.ejs', context)
})

// Products "edit" route - GET - display an edit form for one product

router.get('/:id/edit', (req,res)=>{
    const foundProduct = products[req.params.id]
    const context = {
        product: foundProduct,
        id: req.params.id
    }
    res.render('edit.ejs', context)
})

// Product "index" route - GET - all products
// /products/products
router.get('/', (req, res) => {
    // res.send(products)
    const context = { products }
    res.render('index', context)
})




// Products "create" route - POST requests -> request body (new product data)

router.post('/', (req, res) => {
    
    products.push(req.body)
    res.redirect('/products')
})

// Products "destory" route

router.delete('/:id', (req,res)=>{
    // remove a value from an array at a given index - 
    // Q: what method should I use?
    console.log(req.params.id)
    products.splice(req.params.id , 1 )
    // take products, start at index 2 (3rd item), remove 1 item. 
    // res.status(200).send(`${products.length}`) >> testing the updated product length(quantity of products)
    res.redirect('/products')
    // sending a response - with the current state of the products []
})

// Products "update" route

router.put('/:id', (req,res)=>{
    // res.send(req.body)
    // assumptions: - have data, have id
    // update the products with the new data
    products[req.params.id] = req.body

    // take the user 'back' to the show route for that product
    res.redirect(`/products/${req.params.id}`)
})







module.exports = router