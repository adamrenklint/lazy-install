var semver = require('semver');

module.exports = function (next, current) {
  return !semver.satisfies(current, next);
};