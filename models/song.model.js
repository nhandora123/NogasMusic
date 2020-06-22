const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let SongSchema = new Scheme({
    nameSong: { type: String, required: true },
    content: { type: String, required: true },
    dateCreate: { type: Date, required: true },
    singer: { type: String, required: true },
});

module.exports = mongoose.model('songs', SongSchema);

