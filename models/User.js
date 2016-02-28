/**
**
**
**/
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	name: String,
	address: String,
	contactNumber: Number
})

module.exports = mongoose.model('User', UserSchema);
