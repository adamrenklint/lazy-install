var fs = require('fs');
var child = require('child_process');
var cache = require('./cache');

module.exports = function (dependencies, path, before, done) {

  path = path.replace(/node_modules$/, '');
  var queue = Object.keys(dependencies) || [];
  var count = 0;
  var cached = 0;
  var started = new Date();

  function next () {

    if (queue.length) {
      var name = queue.shift();
      var version = dependencies[name];
      var signature = name + '@' + version;

      cache.copyFrom(path, name, version, function (err) {

        // no error, succeded to copy from local, go to next
        if (!err) {
          cached++;
          return next();
        }

        // this gives a last chance to opt out of installing,
        // or as used in asimov.js, to log the installation progress
        if (!before(name, version)) return next();

        var c = child.exec('cd ' + path + ' && npm install ' + signature, function (err) {

          if (err) return done(err);

          count++;

          cache.copyTo(path, name, version, function (err) {

            next();
          });
        });
      });
    }
    else {
      done(null, {
        'count': count,
        'cached': cached,
        'started': started,
        'dependencies': dependencies
      });
    }
  }

  next();
};