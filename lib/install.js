module.exports = function install (done, options) {

  options = options || {};

  if (typeof options.before === 'function') {
    var result = options.before(1,2,'foo');
    if (!result) return false;
  }

  // ...
};