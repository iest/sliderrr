var merge = require('xtend');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var ActionTypes = require('../constants/Constants').ActionTypes;

var _socketCount = 0;
var SocketStore = merge(Store, {
  getCount: function() {
    return _socketCount;
  }
});

function _setSocketCount(count) {
  _socketCount = count;
}

SocketStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {
    case ActionTypes.RECIEVE_SOCKET_COUNT:
      _setSocketCount(action.count);
      SocketStore.emitChange();
  }
});

module.exports = SocketStore;