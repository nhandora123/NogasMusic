const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, required: true, max: 100},
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    picture: { type: String }
})

module.exports = mongoose.model('users', UserSchema)