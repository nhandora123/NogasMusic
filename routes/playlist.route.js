const express = require('express');
const router = express.Router();
const playlist = require('../controllers/playlist.controller')

const apiPlaylist = (req, res) => {
    router.get('/create', playlist.createPlaylist)
    router.get('/add-song', playlist.insertSongOnPlaylist)
    return router;
}

module.exports = apiPlaylist