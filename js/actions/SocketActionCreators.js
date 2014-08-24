var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;

var SocketActionCreators = {
  recieveSocketCount: function(count) {
    var action = {
      type: ActionTypes.RECIEVE_SOCKET_COUNT,
      count: count
    };
    AppDispatcher.handleServerAction(action);
  }
};

module.exports = SocketActionCreators;