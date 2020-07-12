const express = require('express');
const router = express.Router();
const credential = require('../controllers/credential.controller');

const apiCredential = (passport) => {

    const isAuthenticated = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.json({
            status: 0,
            message: 'You have to sign out your account then must be sign up!',
        })
    }
    const isAuthenticated2 = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.json({ status: 0 });//message: 'Or you have to sign out before then you can sign out!'
    }

    router.post('/signIn', credential.signIn(passport));
    router.post('/signUp', isAuthenticated, credential.signUp(passport));
    router.get('/signOut', isAuthenticated2,(req, res) => {
        req.logout();
        res.json({ status: 1 });//Sign Out success
    })
    return router;
}

module.exports = apiCredential;