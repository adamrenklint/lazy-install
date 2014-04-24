lazy-install
============

Install lazy dependencies when your node.js app starts

## Install from npm

```javascript
$ npm install --save lazy-install
```

## Define lazy dependencies

**Important about version numbers:** the current version of lazy-install only supports absolute version numbers

```javascript
// package.json
{
  "name": "myProject",
  "lazyDependencies": {
    "server": {
      "express": "4.0.0"
    },
    "test": {
      "mocha": "1.18.2"
    }
  }
}
```

## Include in your project

```javascript
var lazy = require("lazy-install");
```

## Basic usage

Install all lazy dependencies in *package.json*

```javascript
function callback (err, installed) {
  if (err) throw new Error(err);
  console.log(installed.count, installed.time);
}
lazy.install(callback);
```

## Using groups

Install app dependencies, and optionally test dependencies

```javascript
var groups = ['server'];
if (process.env.ENV !== 'production') groups.push('test');
lazy.install({
  'groups': groups
}, callback);
```

## Fine-grained control

Make runtime decisions on what to install

```javascript
lazy.install({
  'before': function (name, version) {
    if (name[0] !== 'ex') return false;
    return true;
  }
}, callback);
```

## Use alternate dependencies

Load another json file and install modules relative to its parent folder. Could be useful for when including components as git submodules.

```javascript
lazy.install({
  'path': process.cwd() + '/components/foo/package.json'
}, callback);
```

## Changelog

- **0.3.0** Stores cached module in a shared folder, in ```$HOME/.lazy-install-cache```, for even faster installs when using lazy-install in multiple projects
- **0.2.3** Fixed issue with the cache path
- **0.2.2** Fixed critical bug in ```lib/copy```
- **0.2.1** Improved result logging, separating ```result.count``` and ```result.cached```
- **0.2.0** Cache modules in ```/cache``` for blazing fast re-installs
- **0.1.0** Initial release

Made by [Adam Renklint](http://adamrenklint.com), Berlin 2014. [MIT licensed](https://github.com/adamrenklint/lazy-install/blob/master/LICENSE).