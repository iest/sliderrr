var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var ActionTypes = require('../constants/Constants').ActionTypes;

var _shots = {};

var ShotStore = merge(Store, {
  getAll: function() {
    var shotArr = [];
    for (var k in _shots) {
      shotArr.push(_shots[k]);
    }
    return shotArr;
  }
});

function _addShots(shots) {
  shots.forEach(function(shot) {

    if (!_shots[shot.id]) {
      _shots[shot.id] = shot;
    }
  });
}

ShotStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECIEVE_RAW_SHOTS:
      _addShots(action.rawShots);
      ShotStore.emitChange();
      break;

  }

});

module.exports = ShotStore;