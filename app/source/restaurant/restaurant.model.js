'use strict'

const Sequelize = require('sequelize');
const schema = require('../../tools/sequelize');

module.exports = schema.define('restaurants', {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true,
        autoIncrement: true} ,
        restaurant_name: { type: Sequelize.STRING, allowNull: true },
        restaurant_logo: { type: Sequelize.STRING, allowNull: true },
        restaurant_active: { type: Sequelize.INTEGER, allowNull: true },
    create_user: { type: Sequelize.STRING, allowNull: true },
    create_date: { type: Sequelize.STRING, allowNull: true },
    update_user: { type: Sequelize.STRING, allowNull: true },
    update_date: { type: Sequelize.STRING, allowNull: true },
}, {
    timestamps: false,
    freezeTableName: true
});