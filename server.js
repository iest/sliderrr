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
var fs = require('fs');
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
  var tempArr = _everyone.concat(shotsArr);
  _everyone = $.uniq(tempArr, function(shot) {
    return shot.id;
  });
  io.emit(SocketEvents.EVERYONE_UPDATED, _everyone);
}

function addToPopular(shotsArr) {
  var tempArr = _popular.concat(shotsArr);
  _popular = $.uniq(tempArr, function(shot) {
    return shot.id;
  });
  io.emit(SocketEvents.POPULAR_UPDATED, _popular);
}

function addToDebuts(shotsArr) {
  var tempArr = _debuts.concat(shotsArr);
  _debuts = $.uniq(tempArr, function(shot) {
    return shot.id;
  });
  io.emit(SocketEvents.DEBUTS_UPDATED, _debuts);
}

var openSockets = 0;
var _totalSockets = 0;

io.on('connection', function(socket) {
  openSockets++;
  _totalSockets++;

  fs.writeFile("./total_sockets.txt", _totalSockets);

  socket.emit(SocketEvents.ALL_UPDATED, {
    everyone: _everyone,
    debuts: _debuts,
    popular: _popular
  });
  io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);

  socket.on(SocketEvents.SET_ACTIVE_SHOT, function(id) {
    io.emit(SocketEvents.SET_ACTIVE_SHOT, id);
  });
  socket.on('disconnect', function(socket) {
    openSockets--;
    io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);
  });
});


/**
 * Fetch the first 60 shots for `everyone`, `popular`, and `debuts`, then
 * add them to the associated arrays.
 */
function getAllShots() {
  updateEveryone();
  updatePopular();
  updateDebuts();
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
  getAllShots();
}, 10000);

http.listen(3002, function() {
  console.log('Listening on port %d', http.address().port);
});