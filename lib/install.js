var existing = require('./existing');

module.exports = function install (done, options) {

  options = options || {};
  options.groups = options.groups || [];
  var path = options.path || (process.cwd() + '/package.json');
  var pkg;

  try {
    pkg = require(path);
  }
  catch (e) {
    throw new Error('Failed to load packag.json @ ' + path + ': ' + e);
  }

  var current = existing(path);
  console.log(current);

  var deps = pkg.lazyDependencies || {};

  Object.keys(deps).forEach(function (group) {

    if (options.groups.length && options.groups.indexOf(group) < 0) {
      return;
    }

    var groupDeps = deps[group];

    Object.keys(groupDeps).forEach(function (name) {
      var version = groupDeps[name];

      if (typeof options.before === 'function') {
        var result = options.before(group, name, version);
        if (!result) return false;
      }
    });
  });
};