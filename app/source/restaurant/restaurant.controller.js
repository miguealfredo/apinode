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
function save({ body: { _category, user } }, response) {
    //console.log(id);
    if ( _category.name && _category.name.length > 0 ) {
        if (_category.id) {
            Restaurant.findById(_category.id).then(
                item => {
                    item.name = _category.name;
                    update_user = user;
                    update_date =  new Date();
                    item.save().then(() => {
                        ResponseManager.ok(response, {id: item.id});
                    }).catch(error => ResponseManager.error(response, 500, "Error update item", error));
                }
            ).catch(error => ResponseManager.error(response, 500, "not find item"));
        } else {
            Restaurant.create({
                name: company.name,
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
function down({ body: { _category } }, response) {
    //console.log(id);
    if ( _category.name && _category.name.length > 0 ) {
            Restaurant.findById(_category.id).then(
                item => {
                    item.active = 0;
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