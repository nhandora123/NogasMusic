require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

const signIn = (passport) => function (req, res, next) {

    const { username, password } = req.body;

    if (username && password ) {

        passport.authenticate('signIn', function (err, user, info) {


            if (!user) { return res.status(401).json(err) }//Don't exist this username
        
            req.logIn(user, function (err) {
                if (err) { return next(err); }

                let payLoad = {
                    // _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    //picture: user.picture
                };

                let token = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET);
                return res.json({ status: 1, token: token });// Success

            });
        })(req, res, next);
    } else {
        return res.json({status: -1})
    }
}

const signUp = (passport) =>
    function (req, res, next) {

        const { username, password, fullname } = req.body;

        if (username && password && fullname) {
            passport.authenticate('signUp', function (err, user, infor) {
                let secretKey = "nogav";
                if (!user) { return res.status(401).json( err) }//Exist this username
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    let payLoad = {
                        // _id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        picture: user.picture
        
                    };
        
                    let token = jwt.sign(payLoad, secretKey);
                    return res.json({ status: 1, token: token })
                })
            })(req, res, next);
    
        } else {
            return res.json({status: -1})
        }
    
    }

module.exports = {
    signIn,
    signUp
};