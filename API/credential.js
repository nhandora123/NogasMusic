const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signIn = async (req, res) => {
    const { username, password } = req.body;
    let secretOrKey = "nogav";
    if (username && password) {
        let user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({ message: "Don't find any user" });
        }
        if (isValidPassword(user, password)) {
            let payload = {
                username: user.username,
                fullname: user.fullname,
                picture: user.picture
            }
            let token = jwt.sign(payload, secretOrKey);
            res.json({ msg: "oke", token: token });
        } else {
            res.status(401).json({ msg: "Wrong Password" });
        }
    }
};

const signUp = async (req, res) => {
    const { username, password, fullname } = req.body;
    //console.log(req.body);
    if (username && password) {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(401).json({status: -1})
        } else {
            let userData = await User.create({
                ...req.body,
                password: createHash(password),
            });
            return res.status(200).json({ status: 1, userData: userData });
        }
    } else {
        return res.status(401).json({ status: 0 });
    }
}
const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

module.exports = {
    signIn,
    signUp
};