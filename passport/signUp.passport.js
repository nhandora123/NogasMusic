const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const signUp = (passport) => {
    passport.use("signUp",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true
            },
            (req, username, password, done) => {
                const createAccount = () => {
                    //console.log('Username'+username);
                    User.findOne({ username: username }, (err, user) => {
                        if (err) {
                            console.log(err);
                            return done(err);
                        }
                        if (user) {
                            return done(null, false);
                        } else {
                            //console.log(req);
                            let userInfo = new User();
                            userInfo.username = username;
                            userInfo.fullname = req.body.fullname;
                            userInfo.picture = '';
                            userInfo.password = createHash(password);
                            userInfo.save((err) => {
                                if (err) {
                                    console.log(err.message);
                                    throw err;
                                }
                                //console.log("yeeeeeeeeeee")
                                return done(null, userInfo);
                            })
                        }
                    })
                }
                process.nextTick(createAccount);
            }
        )
    )
    const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null); 
    }
}
 
module.exports = signUp;