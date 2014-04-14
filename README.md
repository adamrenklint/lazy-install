lazy-install
============

Install different dependencies when your node.js app starts

## Install from npm

```javascript
npm install lazy-install
```

## Define lazy dependencies

```javascript
// package.json
{
  "name": "myProject",
  "lazyDependencies": {
    "app": {
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

```javascript
// Install all lazy dependencies
function callback (err, installed) {
  if (err) throw new Error(err);
  console.log(installed.count, installed.time);
}
lazy.install(callback);
```

## Using groups

```javascript
// Install app dependencies, and optionally test dependencies
var groups = ['app'];
if (process.env.ENV !== 'production') groups.push('test');
lazy.install(callback, {
  'groups': groups
});
```