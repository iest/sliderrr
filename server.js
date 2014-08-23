var $ = require('lodash');
var express = require('express');
var app = express();
var ajax = require('superagent');

var stylus = require("stylus");
var nib = require("nib");

app.use(stylus.middleware({
  src: __dirname + "/public",
  compress: true,
  sourcemap: true,
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));

app.use(express.static(__dirname + '/public'));

var _everyone = [];
var _popular = [];
var _debuts = [];

function addToEveryone(shotsArr) {
  _everyone = $.union(_everyone, shotsArr);
}

function addToPopular(shotsArr) {
  _popular = $.union(_popular, shotsArr);
}

function addToDebuts(shotsArr) {
  _debuts = $.union(_debuts, shotsArr);
}


/**
 * Fetch the first 60 shots for `everyone`, `popular`, and `debuts`, then
 * add them to the associated arrays.
 */
function getAllShots() {
  ajax.get('http://api.dribbble.com/shots/everyone?per_page=30')
    .end(function(res) {
      addToEveryone(res.body.shots);
    });
  ajax.get('http://api.dribbble.com/shots/everyone?per_page=30&page=2')
    .end(function(res) {
      addToEveryone(res.body.shots);
    });

  ajax.get('http://api.dribbble.com/shots/popular?per_page=30')
    .end(function(res) {
      addToPopular(res.body.shots);
    });
  ajax.get('http://api.dribbble.com/shots/popular?per_page=30&page=2')
    .end(function(res) {
      addToPopular(res.body.shots);
    });

  ajax.get('http://api.dribbble.com/shots/debuts?per_page=30')
    .end(function(res) {
      addToDebuts(res.body.shots);
    });
  ajax.get('http://api.dribbble.com/shots/debuts?per_page=30&page=2')
    .end(function(res) {
      addToDebuts(res.body.shots);
    });
}

function updateEveryone() {
  ajax.get('http://api.dribbble.com/shots/everyone')
    .end(function(res) {
      addToEveryone(res.body.shots);
    });
}

function updatePopular(shotType) {
  ajax.get('http://api.dribbble.com/shots/popular')
    .end(function(res) {
      addToPopular(res.body.shots);
    });
}

function updateDebuts() {
  ajax.get('http://api.dribbble.com/shots/debuts')
    .end(function(res) {
      addToDebuts(res.body.shots);
    });
}

// API Methods
app.get('/api/everyone', function(req, res) {
  res.send(_everyone);
});

app.get('/api/popular', function(req, res) {
  res.send(_popular);
});

app.get('/api/debuts', function(req, res) {
  res.send(_debuts);
});

getAllShots();
setInterval(function() {
  updateEveryone();
  updatePopular();
  updateDebuts();
}, 10000);

var server = app.listen(8080, function() {
  console.log('Listening on port %d', server.address().port);
});