const express = require('express');
const passport = require('passport');
const initPassport = require('./passport/initSetup')
const connectDB = require('./config/db');
const apiCredential = require('./routes/credential.route')
const apiSong = require('./routes/song.route')
const apiPlayList = require('./routes/playlist.route')
const app = express();

const PORT = process.env.PORT || 1000;

const session = require('express-session');

app.use(session({
    secret: 'subee team',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);


const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({message: 'Please login or logup'})
}

app.use("/credential", apiCredential(passport));
app.use("/song", isAuthenticated, apiSong());
app.use("/playlist", isAuthenticated, apiPlayList());

connectDB();

app.listen(PORT, () => console.log(`App running on port ${PORT}`));