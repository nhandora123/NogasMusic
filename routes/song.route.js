const express = require('express');
const router = express.Router();
const song = require('../controllers/song.controller');

const apiSong = (req, res) => {
    router.post('/create', song.createSong);
    router.post('/remove', song.deleteSong);
    router.post('/edit',song.editSong);
    return router;

}
module.exports = apiSong