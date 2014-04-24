var fs = require('fs');

module.exports = function forceExists (path) {

  path = path.replace(process.cwd(), '');

  var parts = path.split('/');
  var fullPath = '';

  parts.forEach(function (fragment) {

    fullPath += fragment + '/';

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }
  });
};