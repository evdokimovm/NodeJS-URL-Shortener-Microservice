var express = require('express')
var app = express()

var api = require('./app/index')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/URLShortener')

app.use(api)

var port = process.env.PORT || 8080
app.listen(port, function() {
	console.log('Node.js listening on port ' + port)
})
