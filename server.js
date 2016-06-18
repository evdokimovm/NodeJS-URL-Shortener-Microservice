var express = require('express');
var app = express();

var cors = require('cors');
var api = require('./app/index.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
	original_url: String,
	short_url: String
}, {
	collection: 'sites'
});

var Urls = mongoose.model('Urls', urlSchema);
mongoose.connect('mongodb://localhost:27017/urlShortener');

api(app, Urls, cors);

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port);
});
