const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
            },
            function (email, password, done) {
                User.findOne({ email: email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, {
                            message: "Invalid Email.",
                        });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: "Incorrect Password",
                            });
                        }
                    });
                });
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
