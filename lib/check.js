var shouldInstall = require('./shouldInstall');

module.exports = function (toInstall, dependencies, existing, path) {

  toInstall = toInstall || {};

  Object.keys(dependencies || {}).forEach(function (name) {
    var version = dependencies[name];
    var current = existing[name];
    if (shouldInstall(version, current)) {
      toInstall[name] = version;
    }
  });

  return toInstall;
};