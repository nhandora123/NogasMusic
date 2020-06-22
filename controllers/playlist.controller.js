const xml = require('xml')
const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');
const User = require('../models/user.model');

const createPlaylist = async (req, res) => {
    //test user is signing;
    const { namePlaylist } = req.query;
    const { username }= req.user
    const queryExistUserPlaylist = {
        username: username,
    }
    const queryExistNamePlaylist = {
        username: username,
        'playlists.namePlaylist': namePlaylist
    }

    if (namePlaylist && username) {
        const isExistUserPlaylist = await Playlist.findOne(queryExistUserPlaylist);
        const isExistNamePlaylist = await Playlist.findOne(queryExistNamePlaylist);

        //console.log(isExitPlaylist);
        if (!isExistUserPlaylist) {
            let newPlaylist= await Playlist.create({
                username: username,
                playlists: [{
                    namePlaylist: namePlaylist,
                    song: []
                }]
            })
            return res.status(200).json({ status: 1, playlistData: newPlaylist })//username don't have any playlist
            
        } else if (!isExistNamePlaylist) {
           await Playlist.updateOne(
                { username: username },
                {
                    '$addToSet': {
                        'playlists': { namePlaylist: namePlaylist } 
                    }
                }
            )
            //console.log(newPlaylist);
            //console.log(newPlaylist.modifiedCount);
            let newPlaylist = await Playlist.find({username: username});
            return res.status(200).json({status: 2, playlistData: newPlaylist})//add successfully

        } else {
            return res.status(401).json({ status: 0 });//username had this playlist
        }
    } else {
        return res.status(401).json({ status: -1 });//don't have some param
    }
}

const insertSongOnPlaylist = async (req, res) => {

    const { idPlaylist, idSong } = req.query;
    const { username } = req.user;

    if (username && idPlaylist && idSong) {

        Playlist.updateOne(
            { 'username': username, 'playlists._id': idPlaylist },
            {
                '$push':
                    { 'playlists.$.songs': idSong }
            },
            function (err, raw) {
                if (err) {
                    return res.status(200).json({ status: 0, err: 'existed this song' });//existed this song
                }
                //console.log(raw)
            }
        )
        let newPlaylist = await Playlist.find({ username: username, 'playlists._id': idPlaylist, 'playlists.songs': idSong })
        console.log(newPlaylist);
        //return res.status(401).json({ status: 1, newPlaylist: newPlaylist });

    } else {
        return res.status(200).json({ status: -1 });
    }
}

module.exports = {
    createPlaylist,
    insertSongOnPlaylist
    }



