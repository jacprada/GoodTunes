// Setting and exporting mongoose model for users
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true },
  email:    {type: String, required: true, unique: true},
  password: {type: String, required: true }
});

// Encrypting password when stored
UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Compare encrypted passwords
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", UserSchema);
module.exports = User;