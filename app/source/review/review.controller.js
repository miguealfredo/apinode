'use strict'

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../../tools/sequelize');
const bcrypt = require('bcrypt-nodejs');
const JWT = require('../../tools/jwt');
const ResponseManager = require('../../tools/response_manager');

const Review = require('./review.model');




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
function save({ body: { _review, user } }, response) {
    //console.log(id);
    if ( _review.restaurant_id && _review.restaurant_reviews_review && _review.restaurant_reviews_qualification ) {
        if (_review.id) {
            Review.findById(_review.id).then(
                item => {
                    item.restaurant_id = _review.restaurant_id;
                    item.restaurant_reviews_review = _review.restaurant_reviews_review;
                    item.restaurant_reviews_qualification = _review.restaurant_reviews_qualification;
                    item.restaurant_reviews_active = _review.restaurant_reviews_active;
                    update_user = user;
                    update_date =  new Date();
                    item.save().then(() => {
                        ResponseManager.ok(response, {id: item.id});
                    }).catch(error => ResponseManager.error(response, 500, "Error update item", error));
                }
            ).catch(error => ResponseManager.error(response, 500, "not find item"));
        } else {
            Review.create({
                restaurant_id: _review.restaurant_id,
                restaurant_reviews_review: _review.restaurant_reviews_review,
                restaurant_reviews_qualification: _review.restaurant_reviews_qualification,
                restaurant_reviews_active: _review.restaurant_reviews_active,
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
    if (id) {
            Review.findById(id).then(
                item => {
                    item.restaurant_reviews_active = 0;
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