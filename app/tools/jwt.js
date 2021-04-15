'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = class JWT {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    static get key() {
        return "3Kus6W3lC5am15rzl4Spa59ke2qp5xh2";
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    static createToken(user) {
        var payload = {
            id: user.id,
            email: user.email,
            type: user.type,
            creation: moment().unix(),
            expiration: moment().add(30, 'days').unix()
        }
    
        return jwt.encode(payload, this.key);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    static decodeToken(token) {
        return jwt.decode(token, this.key);
    }
}