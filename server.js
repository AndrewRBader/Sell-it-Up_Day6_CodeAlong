// import express
const express = require('express');

// create instance
const app = express();

// configure the app settings (used by app.listen)
const PORT = 4000;

/* 
    App Data
*/

const products = ['t-shirt', 'shoes', 'necklace', 'catfood', 'jump-rope']


/* 
    EXPRESS Middleware - a topic for day 3 of express - this code will run for every route
*/


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


// a products route that accesses data from the 'products' array (DB)
app.get('/products/:productId/', (req, res) => {
    let productId = req.params.productId
    res.send(`testing products route for product: ${products[productId]}`)
})

app.get('/', (request, response) => {

    response.send('Welcome to Sell-it-UP!')
})

/* 
    EXPRESS Server: initializes the server; app.listen allows your computer to receive requests at http://localhost:4000/ 
*/

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))