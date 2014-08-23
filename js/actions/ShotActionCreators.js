var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var WebAPI;
setTimeout(function() {
   WebAPI = require('../utils/WebAPI');
}, 0);

var ShotActionCreators = {
  setActive: function(id) {
    var action = {
      type: ActionTypes.SET_ACTIVE_SHOT,
      id: id
    };
    AppDispatcher.handleViewAction(action);
    WebAPI.emitShotActivated(id);
  },
  setActiveFromServer: function(id) {
    var action = {
      type: ActionTypes.SET_ACTIVE_SHOT,
      id: id
    };
    AppDispatcher.handleServerAction(action);
  },
  recieveAll: function(rawShots, shotCategory) {
    var action = {
      type: ActionTypes.RECIEVE_RAW_SHOTS,
      rawShots: rawShots,
      shotCategory: shotCategory
    };
    AppDispatcher.handleServerAction(action);
  }
};

module.exports = ShotActionCreators;