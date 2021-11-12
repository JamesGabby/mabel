var express = require('express');
var app = express();
var api = require('./controller/api');
var html = require('./controller/html');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
api(app);
html(app);

app.use('/', function(req, res, next) {
    console.log('Request Url: ' + req.url);
    next();
});

app.listen(port);
