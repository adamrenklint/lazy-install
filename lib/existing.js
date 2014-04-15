var fs = require('fs');

module.exports = function (path) {

  var existing = {};

  var folders = fs.readdirSync(path);
  folders.forEach(function (folderPath) {
    var pkgPath = folderPath + '/package.json';
    var pkg;

    try {
      pkg = require(pkgPath);
    }
    catch (e) {}

    pkg && (existing[pkg.name] = pkg.version);
  });

  return existing;
};