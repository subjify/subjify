var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');
	userSchema = mongoose.Schema({
		"name": { "type": String, "required": true},
		"local" : {
			"email": String,
			"password": String
		}
	});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);