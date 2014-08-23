/**
 * AppDispatcher
 *
 * Singleton that operates as central hub for all application updates
 */

var copyProperties = require('react/lib/copyProperties');

var Dispatcher = require('./Dispatcher');

var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param  {object} action
   */
  handleServerAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = AppDispatcher;