const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

let Song = new Scheme({
    nameSong: { type: String, required: true },
    content: { type: String, required: true },
    dateCreate: { type: Date, required: true },
    singer: { type: String},
});

module.exports = mongoose.model('songs', Song);

