const express = require('express');
const router = express.Router();
const signIn = require('../API/credential');

const apiRoutes = (req, res) => {
    router.post('/signIn', signIn.signIn);
    router.post('/signUp', signIn.signUp);
    router.post('/addSong')
    return router;
}
module.exports = apiRoutes;