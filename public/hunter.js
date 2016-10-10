'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var app = express();
var PORT = 3003; // Sets an initial port. We'll use this later in our listener

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static(process.cwd() + '/public'));

var universalRoute = function (res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
};

app.get('/', function (req, res) {
	universalRoute(res);
});

app.listen(PORT, function () {
	console.log('App listening on PORT: ' + PORT);
});
