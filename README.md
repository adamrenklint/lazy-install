lazy-install
============

Install different dependencies when your node.js app starts

## Install from npm

```javascript
$ npm install --save lazy-install
```

## Define lazy dependencies

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
  'before': function (group, name, version) {
    if (name[0] !== 'a') return false;
    return true;
  }
}, callback);
```

## Use alternate dependencies

Load another json file and install modules relative to its parent folder

```javascript
lazy.install({
  'path': process.cwd() + '/configs/dependencies.json'
}, callback);
```