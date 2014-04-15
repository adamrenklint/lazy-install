var fs = require('fs');
var child = require('child_process');

module.exports = function (dependencies, path, before, done) {

  path = path.replace(/node_modules$/, '');
  var queue = Object.keys(dependencies) || [];
  var count = 0;
  var started = new Date();

  function next () {

    if (queue.length) {
      var name = queue.shift();
      var version = dependencies[name];
      var signature = name + '@' + version;

      if (!before(name, version)) return next();

      var c = child.exec('cd ' + path + ' && npm install ' + signature, function (err) {

        if (err) return done(err);

        count++;
        next();
      });
    }
    else {
      done(null, {
        'count': count,
        'started': started,
        'dependencies': dependencies
      });
    }
  }

  next();
};