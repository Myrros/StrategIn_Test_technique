const express = require('express');
const mongoose = require('mongoose');
const app = express();

// We import the routes.
const register_route = require('./routes/register');
const login_route = require('./routes/login');
const users_route = require('./routes/users');
const islogged_route = require('./routes/islogged');

// We connect the database to our application.
mongoose.connect('mongodb+srv://StrategInValentinLefevre:ySOrhoLazze7bbGs@cluster0.vzkwvfp.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Unable to connect to MongoDB");
    console.error(error);
});

// We avid CORS errors by allowing all origins the header of the response.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    console.log(req.body);
    next();
});

// We parse the data of the requests so that they can be used later.
app.use(express.json());

app.use((req, res, next) => {
    console.log("A request was sent.");
    next();
})

// We declare the 4 endpoints and their routes.
app.use('/register', register_route);
app.use('/login', login_route);
app.use('/users', users_route);
app.use('/islogged', islogged_route);

// We export the express app to the server.
module.exports = app;