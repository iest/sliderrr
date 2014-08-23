var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var ActionTypes = require('../constants/Constants').ActionTypes;

var _shots = {};
var _activeShotId = null;

var ShotStore = merge(Store, {
  getAll: function() {
    var shotArr = [];
    for (var k in _shots) {
      shotArr.push(_shots[k]);
    }
    return shotArr;
  },
  getActive: function() {
    return _shots[_activeShotId];
  }
});

function _create(shot) {
  return {
    id: shot.id,
    image: shot.image_url,
    teaser: shot.image_teaser_url
  };
}

function _addShots(rawShots) {
  rawShots.forEach(function(shot) {
    if (!_shots[shot.id]) {
      _shots[shot.id] = _create(shot);
    }
  });
}

function _setActive(index) {
  _activeShotId = ShotStore.getAll()[index].id;
}

ShotStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECIEVE_RAW_SHOTS:
      _addShots(action.rawShots);
      _setActive(0);
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_SHOT:
      _setActive(action.index);
      ShotStore.emitChange();
      break;

  }

});

module.exports = ShotStore;