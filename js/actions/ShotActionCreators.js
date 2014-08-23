var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ShotActionCreators = {
  recieveAll: function(rawShots) {
    var action = {
      type: Constants.ActionTypes.RECIEVE_RAW_SHOTS,
      rawShots: rawShots
    };
    AppDispatcher.handleServerAction(action);
  }
};

module.exports = ShotActionCreators;