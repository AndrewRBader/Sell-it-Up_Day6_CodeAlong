// import express
const express = require('express');

// create instance
const app = express();

// configure the app settings (used by app.listen)
const PORT = 4000;

// app configs - app.set()
app.set('view engine', 'ejs')


/* 
    App Data:
    The products routes below accesses data from the 'products' array (DB) by its index value - we will use 'productId' as the param key.
*/


// MODELS
const products = require('./models/product_model')

/* 
    EXPRESS Middleware - a later topic - this code will run for every route
*/

// first middleware - middleware executes for every request - 
// express.static helps express find where certain files are located

app.use(express.static('public'))

// body-parser middleware -> intercept the data from our post request
// take all of the data in the url-string content and create an object - req.params 
// request body -> data - parsed by the middleware

app.use(express.urlencoded({ extended: false }))


// CONTROLLER 
/* 
    EXPRESS Routing: express provides route methods that will intercept requests to the server:
    1. filter by method - app.get will only run if the type of request has a GET method
    2. match the url path argument - a requested url from the client - if a match is found a call back function is called
    3. the callback function - provided two arguments by express representing data/methods concerning the request and the response. 
        3a - request {} - a request object provides information about the request made by the client
        3b - response {} - a response object is a collection of properties / methods. 
        3c - response.send() - a response method that closes response cycle -> send back info/data to the browser
    
    Note: A response method call is required for every request otherwise the server will "hang" and timeout after 30-60 seconds
*/

// Product "new" route - GET - serves template with form for creating a new product

app.get('/products/new', (req, res) => {
    res.render('new.ejs')
})


// Products "show" route - GET - one product 

app.get('/products/:id/', (req, res) => {
    let productId = req.params.id

    const context = {
        oneProduct: products[productId],
        message: 'I am the show route'
    }
    res.render('show.ejs', context)
})


// Product "index" route - GET - all products

app.get('/products', (req, res) => {
    // res.send(products)
    const context = { products }
    res.render('index', context)
})


// Products "Home" route
app.get('/', (request, response) => response.send('Welcome to Sell-it-UP!'))


// Products "create" route - POST requests -> request body (new product data)

app.post('/products', (req, res) => {
    
    products.push(req.body)
    res.redirect('/products')
})


/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))