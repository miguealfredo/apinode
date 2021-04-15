'use strict'

const express = require('express');
const bodyParser = require('body-parser');

//const fileUpload = require('express-fileupload');
//const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//app.use(fileUpload());

app.use('/category', require('./source/category/category.routes'));
app.use('/restaurant', require('./source/restaurant/restaurant.routes'));
app.use('/review', require('./source/review/review.routes'));
app.use('/category-restaurant', require('./source/category_restaurant/category_restaurant.routes'));

module.exports = app;