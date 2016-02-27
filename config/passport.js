// Requiring local passport strategy, user model, jwt module and secret keyword
var LocalStrategy   = require('passport-local').Strategy;
var User            = require("../models/user");
var jwt             = require('jsonwebtoken');
var secret          = require('./config').secret;

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    process.nextTick(function() {

      // Look for user in database through email
      User.findOne({ 'email' : email }, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, false);

        // If email is not found, create and save new user into database
        var newUser       = new User();
        newUser.email     = email;
        newUser.username  = req.body.username;
        newUser.password  = newUser.encrypt(password);
        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    });
  }));
}