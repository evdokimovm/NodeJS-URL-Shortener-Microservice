var express = require('express');
var app = express();

var cors = require('cors');
var api = require('./app/index.js');

var mongo = require('mongodb').MongoClient;
mongo.connect('mongodb://localhost:27017/urlShortener', function(err, db) {
	db.createCollection('sites');

	api(app, db, cors);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});
