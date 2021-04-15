'use strict'

const Sequelize = require('sequelize');

  
 
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '/var/www/html/apinode/db/app_db.sqlite3',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
      });

module.exports = sequelize;
