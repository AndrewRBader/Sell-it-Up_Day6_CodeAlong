//require mongoose to get connection to mongodb
const mongoose = require('mongoose');

//getting access to .env
require('dotenv').config();

//making a connection Str variable
const connectionStr = process.env.MONGODB_URI;

//using connection str variable in mongoose.connect method to connect mongoDB to our app
mongoose.connect(connectionStr);

//Database handlers for connection, err, disconnection
//connection handler
mongoose.connection.on('connected', ()=> {
    console.log(`${new Date().toLocaleTimeString()} - MongoDB connected!!!`);
});

//error handler
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error ', error);
});

// disconnection handler
mongoose.connection.on('disconnected', () =>{
    console.log('MongoDB disconnected');
});