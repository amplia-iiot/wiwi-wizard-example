'use strict';

var token = require('./utils/token'),
    registerWidget = require('./utils/registerWidget');
var action = process.argv[2];

function finEnv(env) {
    var map = {
        develop: 'https://developv8.opengate.es',
        endesa: 'https://opengate.endesa.es/signin',
        default: 'http://localhost:3977'
    };
    return map[env] || env;
}

var config = {
    apiWebUrl: finEnv(process.argv[3]),
    meta: 'meta-widget.json',
    domain: process.argv[4],
    user: process.argv[5],
    password: process.argv[6]
}


token.getToken(config, function(sessionId) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.log(config);
    switch (action) {
        case 'update':
            registerWidget.update(config, sessionId);
            break;
        case 'register':
            registerWidget.register(config, sessionId);
            break;
        case 'delete':
            registerWidget.delete(config, sessionId);
            break;
        default:
            break;
    }
});