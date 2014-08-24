var ajax = require('superagent');
var io = require('socket.io-client');
var ShotActionCreators = require('../actions/ShotActionCreators');
var SocketActionCreators = require('../actions/SocketActionCreators');
var Constants = require('../constants/Constants');
var SocketEvents = Constants.SocketEvents;
var ShotCategories = Constants.ShotCategories;
var socket = io();

module.exports = {
  initSocketHandlers: function() {
    socket.on(SocketEvents.EVERYONE_UPDATED, function(shots) {
      ShotActionCreators.recieveAll(shots, ShotCategories.EVERYONE);
    });
    socket.on(SocketEvents.POPULAR_UPDATED, function(shots) {
      ShotActionCreators.recieveAll(shots, ShotCategories.POPULAR);
    });
    socket.on(SocketEvents.DEBUTS_UPDATED, function(shots) {
      ShotActionCreators.recieveAll(shots, ShotCategories.DEBUTS);
    });
    socket.on(SocketEvents.SET_ACTIVE_SHOT, function(id) {
      ShotActionCreators.setActiveFromServer(id);
    });
    socket.on(SocketEvents.SOCKET_COUNT_UPDATED, function(count) {
      SocketActionCreators.recieveSocketCount(count);
    });
  },
  emitShotActivated: function(id) {
    socket.emit(SocketEvents.SET_ACTIVE_SHOT, id);
  }
};

// An example shot
var exampleShot = {
  "id": 21603,
  "title": "Moon",
  "description": "My response to Mr. Henry's Friday 20 minute \"moon\" design challenge.\n\nFun. Random. Rough. No clue.",
  "url": "https://dribbble.com/shots/21603-Moon",
  "short_url": "http://drbl.in/21603",
  "image_url": "https://dribbble.com/system/users/1/screenshots/21603/shot_1274474082.png",
  "image_teaser_url": "https://dribbble.com/system/users/1/screenshots/21603/shot_1274474082_teaser.png",
  "width": 400,
  "height": 300,
  "views_count": 1693,
  "likes_count": 15,
  "comments_count": 4,
  "rebounds_count": 0,
  "rebound_source_id": 21595,
  "created_at": "2010/05/21 16:34:42 -0400",
  "player": {
    "id": 1,
    "name": "Dan Cederholm",
    "username": "simplebits",
    "url": "https://dribbble.com/simplebits",
    "avatar_url": "https://dribbble.com/system/users/1/avatars/original/dancederholm-peek.jpg",
    "location": "Salem, MA",
    "twitter_screen_name": "simplebits",
    "drafted_by_player_id": null,
    "shots_count": 147,
    "draftees_count": 103,
    "followers_count": 2027,
    "following_count": 354,
    "comments_count": 2001,
    "comments_received_count": 1509,
    "likes_count": 7289,
    "likes_received_count": 2624,
    "rebounds_count": 15,
    "rebounds_received_count": 279,
    "created_at": "2009/07/07 21:51:22 -0400"
  }
};