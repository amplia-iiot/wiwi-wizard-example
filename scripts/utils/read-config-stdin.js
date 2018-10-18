var stdin = process.openStdin();
var labels = {
  apiWebUrl: 'Type url of api-web (http://localhost:3977):',
  domain: 'Type your domain:',
  user: 'Type your user name:',
  password: 'Type your password:'
};

var defaults = {
  apiWebUrl: 'http://localhost:3977',
  meta: 'meta-widget.json'
};

function hidden(query, callback) {
  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  process.stdin.on('data', function (char) {
    char = char + '';

    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.pause();
        break;
      default:
        process.stdout.write('\033[2K\033[200D' + query + Array(rl.line.length + 1).join('*'));
        break;
    }
  });
  rl.question(query, function (value) {
    rl.history = rl.history.slice(1);
    callback(value);
  });
}

function readNextKey(keys, labels, config, cb) {
  var key = keys.pop();

  function valueTyped(value) {
    stdin.removeAllListeners('data');
    if (value.length === 0) {
      value = defaults[key];
    }
    config[key] = value;
    if (keys.length > 0) {
      readNextKey(keys, labels, config, cb);
    } else {
      process.stdin.unref();
      cb(config);
    }
  }

  if (key === 'password') {
    hidden(labels[key], function (password) {
      valueTyped(password);
    });
  } else {
    console.log(labels[key]);
    stdin.addListener('data', function (d) {
      // note:  d is an object, and when converted to a string it will
      // end with a linefeed.  so we (rather crudely) account for that  
      // with toString() and then trim() 
      valueTyped(d.toString().trim());
    });
  }

}

module.exports.readConfiguration = function (cb) {
  var keys = Object.keys(labels).reverse();
  readNextKey(keys, labels, defaults, cb);
};
