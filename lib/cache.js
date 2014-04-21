var npath = require('path');
var forceExists = require('./forceExists');
var fs = require('fs');
var copy = require('./copy');

exports.copyFrom = function (path, name, version, done) {

  var cachePath = npath.join(path, 'cache', name);
  var versions;

  try {
    versions = fs.readdirSync(cachePath);
  }
  catch (e) {}

  if (versions && versions.length) {
    console.log('cache.copyFrom', cachePath, name, version);
  }
  else {
    done(new Error('Not found in cache'));
  }
};

exports.copyTo = function (path, name, version, done) {

  var modulePath = npath.join(path, 'node_modules', name);
  var pkg = require(npath.join(modulePath, 'package.json'));
  var cachePath = npath.join(path, 'cache', name);

  forceExists(cachePath);
  copy(modulePath, npath.join(cachePath, pkg.version));

  done();
};