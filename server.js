var express = require('express');
var app = express();
var ajax = require('superagent');

var stylus = require("stylus");
var nib = require("nib");

app.use(stylus.middleware({
  src: __dirname + "/public",
  compress: true,
  sourcemap: true,
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));

app.use(express.static(__dirname + '/public'));

app.get('/api/all', function(req, res) {
  ajax.get('http://api.dribbble.com/shots/everyone')
    .end(function(dribbbleRes) {
      var rawShots = dribbbleRes.body.shots;
      res.send(rawShots);
    });
});

var server = app.listen(8080, function() {
  console.log('Listening on port %d', server.address().port);
});