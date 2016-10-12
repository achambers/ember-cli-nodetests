/*jshint node:true*/

var RSVP = require('rsvp');
var fs   = require('fs');
var path = require('path');

var denodeify = RSVP.denodeify;
var readFile  = denodeify(fs.readFile);
var writeFile = denodeify(fs.writeFile);

var readJSON = function(filePath, options) {
  return readFile(filePath, options).then(function(data) {
    return JSON.parse(data);
  });
};

var writeJSON = function(filePath, object, options) {
  var contents = JSON.stringify(object, null, 2) + '\n';
  return writeFile(filePath, contents, options);
};

module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'chai', target: '3.5.0' },
      { name: 'chai-as-promised', target: '6.0.0' },
      { name: 'glob', target: '7.1.1' },
      { name: 'mocha', target: '3.1.2' },
      { name: 'mocha-jshint', target: '2.3.1' }
    ])
    .then(updatePackageJsonTestScript.bind(this))
    .then(updateJshintrc.bind(this));
  }
};

function updatePackageJsonTestScript() {
  var filePath = path.join(this.project.root, 'package.json');
  return readJSON(filePath, 'utf8')
    .then(function(pkg) {
      if (!pkg.scripts) {
        pkg.scripts = {};
      }

      pkg.scripts.test = 'node tests/runner.js';

      return writeJSON(filePath, pkg, 'utf8');
    });
}

function updateJshintrc() {
  var filePath = path.join(this.project.root, 'tests/.jshintrc');
  return readJSON(filePath, 'utf8')
    .then(function(json) {
      if (!json.predef) {
        json.predef = [];
      }

      ['describe', 'beforeEach', 'afterEach', 'it'].forEach(function(token) {
        if (json.predef.indexOf(token) === -1) {
          json.predef.push(token);
        }
      });

      return writeJSON(filePath, json, 'utf8');
    }, function(error) {
      if (error && error.code === 'ENOENT') { return; }

      throw error;
    });
}
