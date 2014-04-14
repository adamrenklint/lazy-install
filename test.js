var lazy = require('./index');

function done (err, installed) {
  console.log(err, installed)
}

lazy.install(done, {
  'groups': ['app'],
  'before': function (group, name, version) {
    console.log('install', group, name, version)
    return true;
  }
});