var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;
var WebAPI;
setTimeout(function() {
   WebAPI = require('../utils/WebAPI');
   // For some retarded reason, browserify dones't handle cyclical
   // dependancies. So have to wait for the next tick before defining
   // WebAPI. This is OK because it's only used when `setActive` is run.
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
  recieveAll: function(shotObject) {
    var action = {
      type: ActionTypes.RECIEVE_SHOT_OBJECT,
      shotObject: shotObject
    };
    AppDispatcher.handleServerAction(action);
  },
  recieveSome: function(rawShots, shotCategory) {
    var action = {
      type: ActionTypes.RECIEVE_SHOTS,
      rawShots: rawShots,
      shotCategory: shotCategory
    };
    AppDispatcher.handleServerAction(action);
  },
  selectNextShot: function() {
    var action = {
      type: ActionTypes.NEXT_SHOT
    };
    AppDispatcher.handleViewAction(action);
  },
  selectPrevShot: function() {
    var action = {
      type: ActionTypes.PREV_SHOT
    };
    AppDispatcher.handleViewAction(action);
  },
  startSlideshow: function() {
    var action = {
      type: ActionTypes.START_SLIDESHOW
    };
    AppDispatcher.handleViewAction(action);
  },
  stopSlideshow: function() {
    var action = {
      type: ActionTypes.STOP_SLIDESHOW
    };
    AppDispatcher.handleViewAction(action);
  }
};

module.exports = ShotActionCreators;