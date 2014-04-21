var fs = require('fs');
var path = require('path');

module.exports = function copy (src, dest) {

  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).forEach(function(childItemName) {
      copy(path.join(src, childItemName), path.join(dest, childItemName));
    });
  }
  else if (exists) {

    fs.linkSync(src, dest);
  }
};