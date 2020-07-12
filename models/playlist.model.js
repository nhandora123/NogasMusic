const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Playlist = new Schema({
    username: { type: String, required: true, max: 100, ref: "user" },
    playlists: [{
        idPlaylist: { type: mongoose.Types.ObjectId },
        namePlaylist: {type: String},
        songs: [{type: mongoose.Types.ObjectId, ref: "songs"}]
    }]
})

module.exports = mongoose.model('playlists', Playlist);