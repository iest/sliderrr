var ajax = require('superagent');

var ShotActionCreators = require('../actions/ShotActionCreators');

module.exports = {
  getShots: function() {
    ajax
      .get('/api/all')
      .end(function(res) {
        var rawShots = res.body;
        ShotActionCreators.recieveAll(rawShots);
      });
  }
};