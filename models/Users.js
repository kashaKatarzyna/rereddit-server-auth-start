var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


//evry user is based of this schema
var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
});

//for instance of user in data, giving it methods
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'myLittleSecret');
};

var User = mongoose.model('User', UserSchema);

module.exports = User;