var fs = require('fs');
var install = require('./lib/install');
var getExisting = require('./lib/existing');
var check = require('./lib/check');

module.exports = function (options, done) {

  options = options || {};
  if (typeof options === 'function') done = options;
  var path = options.path || (process.cwd() + '/package.json');
  if (!path ||  typeof path !== 'string') done(new TypeError('Invalid path'));

  var installed = {};
  var pkg = require(path);
  var lazyDependencies = pkg.lazyDependencies || {};
  options.groups = options.groups || Object.keys(lazyDependencies) || [];
  var before = options.before || function () { return true; };

  var installPath = path.replace('/package.json', '/node_modules');
  if (!fs.existsSync(installPath)) {
    fs.mkdirSync(installPath);
  }

  var existing = getExisting(installPath);

  var toInstall = check({}, pkg.dependencies, existing, installPath);

  options.groups.forEach(function (group) {
    toInstall = check(toInstall, lazyDependencies[group], existing, installPath);
  });

  install(toInstall, installPath, before, done);
};