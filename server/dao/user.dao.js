var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	_id : String,
	password : String
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = {
	UserModel : UserModel
};