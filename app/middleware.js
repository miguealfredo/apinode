'use strict'

const JWT = require('./tools/jwt');
const ResponseManager = require('./tools/response_manager');
const moment = require('moment');

exports.isAuthenticated = (request, response, next) => {
    if (!request.headers.authorization) return ResponseManager.error(response, 403, "Existe una actualización de la plataforma. Se requiere recargar la página actual para acceder a la versión mas reciente.");//"Se requiere cabecera (Header)");

    var token = request.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = JWT.decodeToken(token);

        //if (payload.expiration <= moment().unix()) return ResponseManager.error(response, 401, "El token ha caducado");
        request.token = token;
        request.user = payload;
    } catch (exception) {
        return ResponseManager.error(response, 500, "Error en el token", exception);
    }
    
    next();
}