const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { User, validateUser } = require("../models/user");

// module.exports = function (passport) {
   passport.use(new LocalStrategy({
    usernameField: 'email',
   },
    function(username, password, done) {
      User.findOne({  username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));



    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
// };
