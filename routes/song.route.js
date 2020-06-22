const express = require('express');
const router = express.Router();
const song = require('../controllers/song.controller');

const apiSong = (req, res) => {
    router.post('/create-song', song.createSong);
    //router.get('deleteSong');
    //router.get('editSong');
    return router;

}
module.exports = apiSong