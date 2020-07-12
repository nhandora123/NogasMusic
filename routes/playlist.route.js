const express = require('express');
const router = express.Router();
const playlist = require('../controllers/playlist.controller')

const apiPlaylist = (req, res) => {
    router.post('/create', playlist.createPlaylist)
    router.post('/edit-name', playlist.editNamePlaylist)
    router.post('/remove', playlist.removePlaylist)
    router.post('/show', playlist.showAllPlaylist)
    router.post('/add-song', playlist.insertSongOnPlaylist)
    router.post('/add-song-detail', playlist.insertSongDetailOnPlaylist)
    router.post('/remove-song', playlist.removeSongOnPlaylist)
    return router;
}

module.exports = apiPlaylist