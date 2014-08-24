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
    RECIEVE_RAW_SHOTS: null,
    RECIEVE_SOCKET_COUNT: null,
    SET_ACTIVE_SHOT: null
  }),
  SocketEvents: keyMirror({
    EVERYONE_UPDATED: null,
    DEBUTS_UDATED: null,
    POPULAR_UPDATED: null,
    SET_ACTIVE_SHOT: null,
    SOCKET_COUNT_UPDATED: null
  })
};