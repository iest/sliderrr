var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ShotActionCreators = {
  setActiveShot: function(index) {
    var action = {
      type: Constants.ActionTypes.SET_ACTIVE_SHOT,
      index: index
    };
    AppDispatcher.handleViewAction(action);
  },
  recieveAll: function(rawShots) {
    var action = {
      type: Constants.ActionTypes.RECIEVE_RAW_SHOTS,
      rawShots: rawShots
    };
    AppDispatcher.handleServerAction(action);
  }
};

module.exports = ShotActionCreators;