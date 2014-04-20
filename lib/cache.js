var npath = require('path');

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
  var cachePath = npath.join(path, 'cache', name);
  console.log('cache.copyTo', cachePath, name, version);
};