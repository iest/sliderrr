var merge = require('xtend');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var ActionTypes = require('../constants/Constants').ActionTypes;
var ShotCategories = require('../constants/Constants').ShotCategories;

var _shots = {};
_shots[ShotCategories.EVERYONE] = {};
_shots[ShotCategories.DEBUTS] = {};
_shots[ShotCategories.POPULAR] = {};
var _currentShotCategory;

var ShotStore = merge(Store, {
  getCurrentShotCategory: function() {
    return _currentShotCategory;
  },
  getAllShots: function() {
    var shotArr = [];
    var shotCategory = _shots[_currentShotCategory];
    for (var k in shotCategory) {
      shotArr.push(shotCategory[k]);
    }
    shotArr.reverse();
    return shotArr;
  },
  getActiveShot: function() {
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
    title: shot.title,
    image: shot.image_url,
    teaser: shot.image_teaser_url,
    originalPage: shot.url,
    isActive: false,
    isGif: /\.gif$/.test(shot.image_url)
  };
}

function _addShots(rawShots, category) {
  for (var k in rawShots) {
    if (!_shots[category][k]) {
      _shots[category][k] = _create(rawShots[k]);
    }
  }

}

function _recieveInitResponse(shotObj) {
  var E = ShotCategories.EVERYONE;
  var D = ShotCategories.DEBUTS;
  var P = ShotCategories.POPULAR;

  _addShots(shotObj[E], E);
  _addShots(shotObj[D], D);
  _addShots(shotObj[P], P);

  if (shotObj.activeCategory) {
    _setCurrentShotCategory(shotObj.activeCategory);
  }

  if (shotObj.activeShotId) {
    _setActiveShot(shotObj.activeShotId);
  }
}

function _setCurrentShotCategory(category) {
  _currentShotCategory = category;
}

function _setActiveShot(id) {
  var shotCategory = _shots[_currentShotCategory];
  for (var k in shotCategory) {
    shotCategory[k].isActive = false;
  }
  shotCategory[id].isActive = true;
}

ShotStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch (action.type) {

    case ActionTypes.RECIEVE_SHOT_OBJECT:
      _recieveInitResponse(action.shotObject);
      ShotStore.emitChange();
      break;

    case ActionTypes.RECIEVE_SHOTS:
      _addShots(action.rawShots, action.shotCategory);
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_SHOT:
      _setActiveShot(action.id);
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_CATEGORY:
      _setCurrentShotCategory(action.category);
      ShotStore.emitChange();
      break;

  }

});

module.exports = ShotStore;