/**
 * Constants
 */

var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ShotCategories: {
    EVERYONE: "everyone",
    DEBUTS: "debuts",
    POPULAR: "popular"
  },
  ActionTypes: keyMirror({
    RECIEVE_SHOT_OBJECT: null,
    RECIEVE_SHOTS: null,
    RECIEVE_SOCKET_COUNT: null,
    SET_ACTIVE_SHOT: null,
    START_SLIDESHOW: null,
    STOP_SLIDESHOW: null,
    NEXT_SHOT: null,
    PREV_SHOT: null
  }),
  SocketEvents: keyMirror({
    ALL_UPDATED: null,
    EVERYONE_UPDATED: null,
    DEBUTS_UDATED: null,
    POPULAR_UPDATED: null,
    SET_ACTIVE_SHOT: null,
    SET_ACTIVE_CATEGORY: null,
    SOCKET_COUNT_UPDATED: null
  })
};