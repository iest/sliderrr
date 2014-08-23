var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var ActionTypes = require('../constants/Constants').ActionTypes;
var ShotCategories = require('../constants/Constants').ShotCategories;

var _shots = {};
_shots[ShotCategories.EVERYONE] = {};
_shots[ShotCategories.DEBUTS] = {};
_shots[ShotCategories.POPULAR] = {};
var _currentShotCategory = ShotCategories.EVERYONE;

var ShotStore = merge(Store, {
  getCurrentShotCategory: function() {
    return _currentShotCategory;
  },
  getAll: function() {
    var shotArr = [];
    var shotCategory = _shots[_currentShotCategory];
    for (var k in shotCategory) {
      shotArr.push(shotCategory[k]);
    }
    shotArr.reverse();
    return shotArr;
  },
  getActive: function() {
    var foundShot = null;
    var shotCategory = _shots[_currentShotCategory];
    for (var k in shotCategory) {
      var shot = shotCategory[k];

      if (!shot) break;

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
    isActive: false,
    isGif: /\.gif$/.test(shot.image_url)
  };
}

function _addShots(rawShots, category) {
  var shotCategory = _shots[category];
  rawShots.forEach(function(shot) {
    if (!shotCategory[shot.id]) {
      shotCategory[shot.id] = _create(shot);
    }
  });
}

function _setActive(id) {
  var shotCategory = _shots[_currentShotCategory];
  for (var k in shotCategory) {
    shotCategory[k].isActive = false;
  }
  shotCategory[id].isActive = true;
}

ShotStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.RECIEVE_RAW_SHOTS:
      _addShots(action.rawShots, action.shotCategory);
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_SHOT:
      _setActive(action.id);
      ShotStore.emitChange();
      break;

  }

});

module.exports = ShotStore;