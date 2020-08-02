const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');
const Song = require('../models/song.model')
const song = require('../controllers/song.controller')

const createPlaylist = async (req, res) => {
    //test user is signing;
    const { namePlaylist } = req.body;
    const { username }= req.user
    const queryExistUserPlaylist = {
        username: username,
    }
    const queryExistNamePlaylist = {
        username: username,
        'playlists.namePlaylist': namePlaylist
    }

    if (namePlaylist && username) {
        try {
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
                return res.status(200).json({ status: 1, playlistData: newPlaylist[0].playlists })//username don't have any playlist
                
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
                let newPlaylist = await Playlist.find({username: username}).select("-_id playlists");
                return res.status(200).json({status: 1, playlistData: newPlaylist[0].playlists})//add successfully
    
            } else {
                return res.status(401).json({ status: 0 });//username had this playlist
            }
    
        } catch (error) {
            return res.status(401).json({ status: 0, error: error});//username had this playlist
        }
    } else {
        return res.status(401).json({ status: -1 });//don't have some param
    }
}

const editNamePlaylist = async (req, res) => {
    const { idPlaylist, namePlaylist } = req.body;
    const { username } = req.user;

    const queryExistIdPlaylist = {
        username: username,
        'playlists._id': idPlaylist
    }
    if (username && idPlaylist && namePlaylist) {
        try {
            var isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
            if (isExistIdPlaylist) {
                newPlaylist = await Playlist.updateOne({
                    username: username, 'playlists._id': idPlaylist},
                    { 'playlists.$.namePlaylist': namePlaylist });
                    isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
                return res.status(401).json({ status: 1, dataPlaylist: isExistIdPlaylist });
            } else {
                return res.status(401).json({ status: 0 });
            }
        } catch (error) {
            return res.status(401).json({ status: 0, err: error });
        }
    } else return res.status(401).json({ status: -1 });
}

const removePlaylist = async (req, res) => {
    const { idPlaylist } = req.body;
    const { username } = req.user;

    const queryExistIdPlaylist = {
        username: username,
        'playlists._id': idPlaylist
    }
    if (username && idPlaylist) {
        try {
            var isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
            if (isExistIdPlaylist) {

                newPlaylist = await Playlist.updateOne({
                    username: username, 'playlists._id': idPlaylist
                }, {
                        '$pull': { 'playlists': { _id: idPlaylist }}
                });
                var newPlaylist1 = await Playlist.findOne({username: username});
                return res.status(401).json({ status: 1, dataPlaylist: newPlaylist1 });

            } else {
                return res.status(401).json({ status: 0 });
            }
        } catch (error) {
            return res.status(401).json({ status: 0, err: error });
        }
    } else return res.status(401).json({ status: -1 });
}
const showAllPlaylist = async (req, res) => {
    const { username } = req.user;
    const queryExistUserPlaylist = {
        username: username,
    }
    if (username) {
        try {
            const isExistUserPlaylist = await Playlist.findOne(queryExistUserPlaylist).populate({path: "playlists.songs", select: "nameSong content dateCreate singer"});

            //console.log(isExitPlaylist);
            if (isExistUserPlaylist) {
                return res.status(200).json({ status: 1, playlistData: isExistUserPlaylist })//username don't have any playlist
            } else {
                return res.status(401).json({ status: 0 });//username had this playlist
            }
        } catch (error) {
            return res.status(401).json({ status: 0, err: error});
        }

    } else {
        return res.status(401).json({ status: -1 });//don't have some param
    }

}

const insertSongOnPlaylist = async (req, res) => {

    const { idPlaylist, idSong } = req.body;
    const { username } = req.user;

    const queryExistIdPlaylist = {
        username: username,
        'playlists._id': idPlaylist
    }
    //console.log(idSong);
    if (username && idPlaylist && idSong) {
        try {
            const isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
            if (isExistIdPlaylist) {    
                // await Playlist.update(
                //     { 'username': username, playlists: { $elemMatch: { _id: idPlaylist } } },
                //     {
                //         '$pull': {}
                // }
                // )
                await Playlist.updateOne(
                    { 'username': username, 'playlists._id': idPlaylist },
                    {
                        
                        '$addToSet':
                            { 'playlists.$.songs':  idSong  }
                    }, 
                    function (err, raw) {
                        if (err) {
                            return res.status(200).json({ status: 0});//existed this song
                        }
                        //console.log(raw)
                    }
                )
                let newPlaylist = await Playlist.find({ username: username, 'playlists._id': idPlaylist})
                //return res.status(400).send(convert.json2xml({ status: 1, newPlaylist: newPlaylist }, options));
                return res.status(401).json({ status: 1, dataPlaylist: newPlaylist[0].playlists });
            }
            else {
                return res.status(200).json({ status: -1 });//don't exist this idPlaylist
            }
    
        } catch (error) {
            return res.status(200).json({ status: 0, error: error});//existed this song

        }
    } else {
        return res.status(200).json({ status: -2 });
    }
}

const removeSongOnPlaylist = async (req, res) => {

    const { idPlaylist, idSong } = req.body; 
    const { username } = req.user;

    const queryExistIdPlaylist = {
        username: username,
        'playlists._id': idPlaylist
    }
    const queryExistIdSong = {
        username: username,
        'playlists._id': idPlaylist,
        'playlists.songs': [idSong]
    }
    //console.log(idSong);
    if (username && idPlaylist && idSong) {
        try {
            const isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
            if (isExistIdPlaylist) {    
    
                const isExistIdSong = await Playlist.findOne(queryExistIdSong);
    
                if (isExistIdSong) {
                    await Playlist.updateOne(
                        { 'username': username, 'playlists._id': idPlaylist },
                        {
                            
                            '$pull':
                                { 'playlists.$.songs':  idSong  }
                        }, 
                    )
                    let newPlaylist = await Playlist.find({ username: username, 'playlists._id': idPlaylist})
                    //return res.status(400).send(convert.json2xml({ status: 1, newPlaylist: newPlaylist }, options));
                    return res.status(401).json({ status: 1, dataPlaylist: newPlaylist[0].playlists });
        
                } else {
                    return res.status(200).json({status: -1})
                }
            }
            else {
                return res.status(200).json({ status: 0 });//don't exist this idPlaylist
            }
        } catch (error) {
            return res.status(200).json({status: -3, error: error})
        }

    } else {
        return res.status(200).json({ status: -2 });
    }
}

const insertSongDetailOnPlaylist = async (req, res) => {
    const { idPlaylist, nameSong, content, dateCreate, singer } = req.body;
    const { username } = req.user;
    const queryExistIdPlaylist = {
        username: username,
        'playlists._id': idPlaylist
    }

    const queryExistSong = {
        'nameSong': nameSong,
        'content': content,
        'singer': singer
    }

    if (idPlaylist && nameSong && content && dateCreate && singer) {
        try {
            const isExistSong = await Song.findOne(queryExistSong);
            let idSong;
            if (isExistSong) {
                idSong = isExistSong._id;
            } else {

                const songData = await Song.create({ nameSong, content, dateCreate, singer });
                idSong = songData._id;
            }
            console.log(idSong);
            const isExistIdPlaylist = await Playlist.findOne(queryExistIdPlaylist);
            if (isExistIdPlaylist) {
                await Playlist.updateOne(
                    { 'username': username, 'playlists._id': idPlaylist },
                    {
                        '$addToSet':
                            { 'playlists.$.songs': idSong }
                    },
                    function (err, raw) {
                        if (err) {
                            return res.status(200).json({ status: 0 });//existed this song
                        }
                        //console.log(raw)
                    }
                )
                let newPlaylist = await Playlist.find({ username: username, 'playlists._id': idPlaylist })
                return res.status(401).json({ status: 1, dataPlaylist: newPlaylist });
            }
            else {
                return res.status(200).json({ status: 0 });//don't exist this idPlaylist
            }
        } catch (error) {
            return res.status(200).json({ status: -2, error: error });//existed this song
        }
    } else return res.status(200).json({ status: -1 });//existed this song
}


module.exports = {
    createPlaylist,
    editNamePlaylist,
    removePlaylist,
    showAllPlaylist,
    insertSongOnPlaylist,
    removeSongOnPlaylist,
    insertSongDetailOnPlaylist
}
