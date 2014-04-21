var install = require('./index');

install({
  'before': function (name, version) {
    console.log('Installing ' + name + ' @ ' + version);
    return true;
  },
}, function (err, installed) {

  if (err) return console.log('Failed!', err);
  console.log('Installed ' + installed.count + ' module(s), copied ' + installed.cached + ' from cache');
});