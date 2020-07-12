const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const signIn = (passport) => {
    passport.use(
        "signIn",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true
            },
            (req, username, password, done) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) return done(err);
                    
                    if (!user) {
                        return done({status: 0}, false)
                    }
                    console.log(user);

                    if (!isValidPassword(user, password)) {
                        return done({status: -2}, false);
                    }
                    console.log("afd")
                    return done(null, user);
                })
            }
        )
    )
    const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }
}

module.exports = signIn;