'use strict';

var request = require('request'),
  fs = require('fs'),
  nameWidget = require('../../package.json').name;


function Request() {
  var str = '';
  this.on('response', function (res) {
    console.log('#### RESPONSE ####');
    console.log('StatusCode:' + res.statusCode);
    if (res.statusCode === 201) {
      console.log('Location:' + res.headers.location);
    } else {
      console.log('Error: ' + JSON.stringify(res));
    }
  });
  this.on('data', function (chunk) {
    str += chunk;
  });
  this.on('end', function () {
    console.log(str);
  });
  return this;
}

function createRequest(type, token, config, nameWidget) {
  var requestConfig = {
    url: config.apiWebUrl + '/api/wiwi/' + config.domain + '/bundles',
    headers: {
      'authorization': token
    }
  };
  return {
    'POST': function () {
      return Request.call(request.post(requestConfig));
    },
    'PUT': function () {
      requestConfig.url = requestConfig.url + '/' + nameWidget;
      return Request.call(request.put(requestConfig));
    },
    'DELETE': function () {
      requestConfig.url = requestConfig.url + '/' + nameWidget;
      return Request.call(request.delete(requestConfig));
    }
  } [type]();

}

function createForm(request, metaFile) {
  var form = request.form();
  form.append('meta', fs.createReadStream(process.cwd() + '/' + metaFile));
  form.append('bundle', fs.createReadStream(process.cwd() + '/build/bundle.js'));
  form.append('vendor', fs.createReadStream(process.cwd() + '/build/vendor.bundle.js'));
  return form;
}

module.exports.register = function (config, sessionId) {
  var postReq = createRequest('POST', sessionId, config, nameWidget);
  var form = createForm(postReq, config.meta);
  form.append('name', nameWidget);
};

module.exports.update = function (config, sessionId) {
  var putReq = createRequest('PUT', sessionId, config, nameWidget);
  createForm(putReq, config.meta);
};

module.exports.delete = function (config, sessionId) {
  var deleteReq = createRequest('DELETE', sessionId, config, nameWidget);
  deleteReq.end();
};
