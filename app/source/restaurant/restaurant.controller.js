'use strict'

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../tools/sequelize');
const bcrypt = require('bcrypt-nodejs');
const JWT = require('../../tools/jwt');
const ResponseManager = require('../../tools/response_manager');

const Restaurant = require('./restaurant.model');




///////////////////////////////////////////////////////////////////////////////////////////////////
function getList(request, response) {
    sequelize.query("" +
        "SELECT * " +
        "FROM category ",
        { type: sequelize.QueryTypes.SELECT }
    ).then(
        data => {
            ResponseManager.ok(response, {list: data});
        }
    ).catch(error => ResponseManager.error(response, 500, "Error list item", error))
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function save({ body: { _restaurant, user } }, response) {
    //console.log(id);
    if ( _restaurant.restaurant_name && _restaurant.restaurant_name.length > 0 ) {
        if (_restaurant.id) {
            Restaurant.findById(_restaurant.id).then(
                item => {
                    item.restaurant_name = _restaurant.restaurant_name;
                    update_user = user;
                    update_date =  new Date();
                    item.save().then(() => {
                        ResponseManager.ok(response, {id: item.id});
                    }).catch(error => ResponseManager.error(response, 500, "Error update item", error));
                }
            ).catch(error => ResponseManager.error(response, 500, "not find item"));
        } else {
            Restaurant.create({
                restaurant_name: _restaurant.restaurant_name,
                create_user : user,
                create_date : new Date(),
                update_user : user,
                update_date :  new Date(),
            }).then(item => {
                ResponseManager.ok(response, {data: item});
            }).catch(error => ResponseManager.error(response, 500, "Error update item", error));
        }
    } else ResponseManager.incompleteFields(response);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function down({ body: { id } }, response) {
    //console.log(id);
    if ( id ) {
            Restaurant.findById(id).then(
                item => {
                    item.restaurant_active = 0;
                    item.save().then(() => {
                        ResponseManager.ok(response, {id: item.id});
                    }).catch(error => ResponseManager.error(response, 500, "Error update item", error));
                }
            ).catch(error => ResponseManager.error(response, 500, "not find item"));
      
    } else ResponseManager.incompleteFields(response);
}


///////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getList,
    save,
    down,
};