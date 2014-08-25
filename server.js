/**
 * TODO:
 * - Allow the client to change the current active category
 *
 * TODO: Server-side shot management:
 * - Fetch shots for the current category only
 * - Don't add duplicate shots
 * - Poll dribbble API every ~30 seconds
 * - Only poll API when there are sockets connected
 * - If we have no shots when a socket connects, hit the Dribbble API
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ajax = require('superagent');
var ShotCategories = require('./js/constants/Constants').ShotCategories;
var SocketEvents = require('./js/constants/Constants').SocketEvents;

// Serve styles and index.html
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

// Dribbble-related stuff
var _shots = {
  everyone: {},
  debuts: {},
  popular: {}
};
var _activeCategory = ShotCategories.POPULAR;
var _activeShotId = null;

/**
 * Fetch shots from the Dribbble API.
 * Add new shots to the current active shot category.
 * Emit io event for given category to all open sockets.
 */
function populateCurrentShotCategory() {

  var currentCategory = _shots[_activeCategory];

  ajax.get('http://api.dribbble.com/shots/' + _activeCategory)
    .on('error', function(err) {
      console.error("Request error: " + err);
    })
    .end(function(res) {

      if (res.error) {
        console.error("Bad response: " + res.error.message);
        return;
      }

      var newShots = res.body.shots;

      newShots.forEach(function(shot) {
        if (!(shot.id in currentCategory)) {
          currentCategory[shot.id] = shot;
        }
      });

      var event;
      switch (_activeCategory) {
        case ShotCategories.POPULAR:
          event = SocketEvents.POPULAR_UPDATED;
          break;
        case ShotCategories.EVERYONE:
          event = SocketEvents.EVERYONE_UPDATED;
          break;
        case ShotCategories.DEBUTS:
          event = SocketEvents.DEBUTS_UPDATED;
          break;
      }

      io.emit(event, currentCategory);
    });
}

// Populate the current category, then update every 30 seconds
populateCurrentShotCategory();
setInterval(populateCurrentShotCategory, 30000);

// Socket-related stuff
var openSockets = 0;
io.on('connection', function(socket) {

  // Keep a counter of open sockets
  openSockets++;

  // Tell all clients a socket connected
  io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);

  // Send the new client everything it needs
  socket.emit(SocketEvents.ALL_UPDATED, {
    everyone: _shots.everyone,
    debuts: _shots.debuts,
    popular: _shots.popular,
    activeShotId: _activeShotId,
    activeCategory: _activeCategory
  });

  // Listen for a client setting the current active shot, then tell
  // all clients that it was changed
  socket.on(SocketEvents.SET_ACTIVE_SHOT, function(id) {
    _activeShotId = id;
    io.emit(SocketEvents.SET_ACTIVE_SHOT, id);
  });

  // Listen for a client setting the active category, then tell
  // all clients that it was changed
  socket.on(SocketEvents.SET_ACTIVE_CATEGORY, function(category) {
    _activeCategory = category;
    io.emit(SocketEvents.SET_ACTIVE_CATEGORY, category);
    if (!Object.keys(shots[_activeCategory]).length) {
      populateCurrentShotCategory();
    }
  });

  // When this socket disconnects, decrement the counter and tell other
  // clients
  socket.on('disconnect', function(socket) {
    openSockets--;
    io.emit(SocketEvents.SOCKET_COUNT_UPDATED, openSockets);
  });
});

// Now listen for requests
http.listen(3002, function() {
  console.log('Listening on port %d', http.address().port);
});