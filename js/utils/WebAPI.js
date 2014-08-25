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
    socket.on(SocketEvents.ALL_UPDATED, function(shotObject) {
      ShotActionCreators.recieveAll(shotObject);
    });
    socket.on(SocketEvents.EVERYONE_UPDATED, function(shots) {
      ShotActionCreators.recieveSome(shots, ShotCategories.EVERYONE);
    });
    socket.on(SocketEvents.POPULAR_UPDATED, function(shots) {
      ShotActionCreators.recieveSome(shots, ShotCategories.POPULAR);
    });
    socket.on(SocketEvents.DEBUTS_UPDATED, function(shots) {
      ShotActionCreators.recieveSome(shots, ShotCategories.DEBUTS);
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