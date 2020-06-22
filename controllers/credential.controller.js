
require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

const signIn = (passport) => function (req, res, next) {
    passport.authenticate('signIn', function (err, user, info) {
//node
//> require('crypto').randomBytes(64).toString('hex')
        if (err) { return next(err); }

        if (!user) { return res.status(401).json({ status: 0, message: "Don't exist this username" }) }
        
        req.logIn(user, function (err) {
            if (err) { return next(err); }

            let payLoad = {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                picture: user.picture

            };

            let token = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET);
            return res.json({ status: 1, message: "oke", token: token })
        });
    })(req, res, next);
}

const signUp = (passport) =>
    function (req, res, next) {
        passport.authenticate('signUp', function (err, user, infor) {
            let secretKey = "nogav";
            if (err) {
                return next(err);
            }
            if (!user) { return res.status(401).json({ status: 0, message: "Don't exist username" }) }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                let payLoad = {
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    picture: user.picture
    
                };
    
                let token = jwt.sign(payLoad, secretKey);
                return res.json({ status: 1, message: "oke", token: token })
            })
        })(req, res, next);
    }

module.exports = {
    signIn,
    signUp
};