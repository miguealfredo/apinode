'use strict'

const express = require('express');
const api = express.Router();
const middleware = require('../../middleware');
const controller = require('./category_restaurant.controller');

api.get('/list', controller.getList);
api.post('/save', controller.save);
api.post('/delete', controller.save);


module.exports = api;