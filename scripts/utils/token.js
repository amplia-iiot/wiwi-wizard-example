'use strict';

var request = require('request');

function Request(cb) {
  var str = '';
  var errorCode = null;
  this.on('response', function (res) {
    console.log('#### RESPONSE ####');
    console.log('StatusCode:' + res.statusCode);
    if (res.statusCode === 201) {
      console.log('Location:' + res.headers.location);
      cb();
    } else {
      errorCode = res.statusCode;
    }
  });
  this.on('data', function (chunk) {
    str += chunk;
  });
  this.on('end', function () {
    console.log(str);
    if (errorCode) {
      cb(str);
    }
  });
  return this;
}

function getToken(config, user, cb) {

  console.log(JSON.stringify(config));
  console.log(JSON.stringify(user));
  var requestConfig = {
    url: config.apiWebUrl + '/api/signin?getHash=true',
    headers: {
      'Content-Type': 'application/json'
    },
    json: true,
    body: user
  };
  Request.call(request.post(requestConfig), cb);

}

module.exports.getToken = function (config, cb) {

  var _user = {
    email: config.user,
    password: config.password,
    domain: config.domain,
    profile: 'wiwi'
  };

  getToken(config, _user, function (userWithToken) {
    userWithToken = JSON.parse(userWithToken);
    let token = userWithToken.token;
    cb(token);
  });

};
