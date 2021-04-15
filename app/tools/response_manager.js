'use strict'

module.exports = class ResponseManager {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    static error(response, code, message, error) {
        return response.status(code).send({ message: message, error: '' + error });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    static incompleteFields(response) {
        return this.error(response, 400, "Campos incompletos");
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////
    static ok(response, params) {
        if (!params) response.status(204);

        return response.status(200).send(params);
    }
}