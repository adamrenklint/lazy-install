var npath = require('path');
var forceExists = require('./forceExists');
var fs = require('fs');
var copy = require('./copy');
var semver = require('semver');
var cacheDir = npath.join(process.env.HOME, '.lazy-install-cache');

exports.copyFrom = function (path, name, version, done) {

  var cachePath = npath.join(cacheDir, name);
  var versions;

  try {
    versions = fs.readdirSync(cachePath);
  }
  catch (e) {
    return done(new Error('Not found in cache'));
  }

  if (versions && versions.length) {

    var checkingVersion;

    while (versions.length) {
      checkingVersion = versions.shift();
      if (semver.satisfies(checkingVersion, version)) {
        version = [];
        copy(npath.join(cachePath, checkingVersion), npath.join(path, 'node_modules', name));
        return done();
      }
    }

    done(new Error('Not found in cache'));
  }
  else {
    done(new Error('Not found in cache'));
  }
};

exports.copyTo = function (path, name, version, done) {

  var modulePath = npath.join(path, 'node_modules', name);
  var pkg = require(npath.join(modulePath, 'package.json'));
  var cachePath = npath.join(cacheDir, name);

  forceExists(cachePath);
  copy(modulePath, npath.join(cachePath, pkg.version));

  done();
};