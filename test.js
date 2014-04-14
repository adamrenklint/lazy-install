var lazy = require('./index');
var tests = [];

function next (err) {

  if (err) throw new Error(err);
  if (!tests.length) process.exit();

  var config = tests.shift();
  lazy.install(next, config);
}

tests.push({
  'groups': ['main'],
  'before': function (group, name, version) {
    console.log('before install', group, name, version);
    return true;
  }
});

next();