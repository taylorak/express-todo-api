var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var buzzwordRoute = require('./routes/buzzwords');
var resetRoute = require('./routes/reset');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/buzzword', buzzwordRoute);
app.use('/reset', resetRoute);


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s%s', host, port);
});