var mongoose = require('mongoose')
var Schema = mongoose.Schema

var URLSchema = new Schema({
	original_url: String,
	short_url: String
}, {
	collection: 'sites'
})

module.exports = mongoose.model('URL', URLSchema)
