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

    return shotArr.reverse();
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
    isGif: /.*\.gif/.test(shot.image_url)
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

function _selectNextShot() {
  var allShots = ShotStore.getAllShots();
  var _activeShotId = ShotStore.getActiveShot().id;
  var foundIndex;
  allShots.forEach(function(shot, i) {
    if (shot.id === _activeShotId) {
      foundIndex = i;
    }
  });
  var newIndex = foundIndex + 1;
  if (newIndex > allShots.length - 1) {
    _activeShotId = allShots[0].id;
  } else {
    _activeShotId = allShots[newIndex].id;
  }
  _setActiveShot(_activeShotId);
}

function _selectPrevShot() {
  var allShots = ShotStore.getAllShots();
  var _activeShotId = ShotStore.getActiveShot().id;
  var foundIndex;
  allShots.forEach(function(shot, i) {
    if (shot.id === _activeShotId) {
      foundIndex = i;
    }
  });
  var newIndex = foundIndex - 1;
  if (newIndex < 0) {
    _activeShotId = allShots[allShots.length - 1].id;
  } else {
    _activeShotId = allShots[newIndex].id;
  }
  _setActiveShot(_activeShotId);
}

var _slideTimer;

function _setupSlideshow() {
  _slideTimer = setInterval(function() {
    _selectNextShot();
    ShotStore.emitChange();
  }, 10000);
}

function _teardownSlideshow() {
  clearInterval(_slideTimer);
}

var _pause;
function _pauseSlideshowThenContinue() {
  if (_pause) {
    clearTimeout(_pause);
  }
  _teardownSlideshow();
  _pause = setTimeout(_setupSlideshow, 20000);
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
      _pauseSlideshowThenContinue();
      ShotStore.emitChange();
      break;

    case ActionTypes.SET_ACTIVE_CATEGORY:
      _setCurrentShotCategory(action.category);
      ShotStore.emitChange();
      break;

    case ActionTypes.START_SLIDESHOW:
      _setupSlideshow();
      break;

    case ActionTypes.STOP_SLIDESHOW:
      _teardownSlideshow();
      break;

    case ActionTypes.NEXT_SHOT:
      _selectNextShot();
      ShotStore.emitChange();
      break;

    case ActionTypes.PREV_SHOT:
      _selectPrevShot();
      ShotStore.emitChange();
      break;
  }

});

module.exports = ShotStore;