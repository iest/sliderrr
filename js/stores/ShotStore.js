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
    shotArr.reverse();
    return shotArr;
  },
  getActive: function() {
    var foundShot = null;
    for (var k in _shots) {
      var shot = _shots[k];
      if (shot.isActive) {
        foundShot = shot;
        break;
      }
    }
    return foundShot;
  }
});

function _create(shot) {
  return {
    id: shot.id,
    image: shot.image_url,
    teaser: shot.image_teaser_url,
    isActive: false
  };
}

function _addShots(rawShots) {
  rawShots.forEach(function(shot) {
    if (!_shots[shot.id]) {
      _shots[shot.id] = _create(shot);
    }
  });
}

function _setActive(id) {
  for (var k in _shots) {
    _shots[k].isActive = false;
  }

  _shots[id].isActive = true;
}

ShotStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECIEVE_RAW_SHOTS:
      _addShots(action.rawShots);
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_SHOT:
      _setActive(action.id);
      ShotStore.emitChange();
      break;

  }

});

module.exports = ShotStore;