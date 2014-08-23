var express = require('express');
var app = express();
var ajax = require('superagent');

app.use(express.static(__dirname + '/public'));

app.get('/api/all', function(req, res) {
  ajax.get('http://api.dribbble.com/shots/popular')
    .end(function(dribbbleRes) {
      var rawShots = dribbbleRes.body.shots;
      res.send(rawShots);
    });
});

var server = app.listen(8080, function() {
  console.log('Listening on port %d', server.address().port);
});