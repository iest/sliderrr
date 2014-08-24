/**
 * TODO:
 * - Allow a different client to change the current active image 
 * - Allow a different client to change the current active list
 */

var $ = require('lodash');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ajax = require('superagent');
var SocketEvents = require('./js/constants/Constants').SocketEvents;

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
  io.emit(SocketEvents.EVERYONE_UPDATED, _everyone);
}

function addToPopular(shotsArr) {
  _popular = $.union(_popular, shotsArr);
  io.emit(SocketEvents.POPULAR_UPDATED, _popular);
}

function addToDebuts(shotsArr) {
  _debuts = $.union(_debuts, shotsArr);
  io.emit(SocketEvents.DEBUTS_UPDATED, _debuts);
}

var openSockets = 0;

io.on('connection', function(socket) {
  openSockets++;
  socket.emit(SocketEvents.EVERYONE_UPDATED, _everyone);
  socket.emit(SocketEvents.POPULAR_UPDATED, _popular);
  socket.emit(SocketEvents.DEBUTS_UPDATED, _debuts);
  io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);

  socket.on(SocketEvents.SET_ACTIVE_SHOT, function(id) {
    io.emit(SocketEvents.SET_ACTIVE_SHOT, id);
  });
  socket.on('disconnect', function() {
    openSockets--;
    io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);
  });
});


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

getAllShots();
setInterval(function() {
  updateEveryone();
  updatePopular();
  updateDebuts();
}, 10000);

http.listen(8080, function() {
  console.log('Listening on port %d', http.address().port);
});