const Song = require('../models/song.model');

const createSong = async (req, res) => {
    const { nameSong, content, dateCreate, singer } = req.body;
    if (nameSong && content && dateCreate) {
        try {
            let song = await Song.findOne({ nameSong, content, dateCreate });
            if (song) {
                return res.status(401).json({ status: 0 })
            } else {
                let songData = await Song.create(req.body);
                return res.status(200).json({ status: 1, songData: songData });
            }
        } catch (error) {
            return res.status(401).json({status: 0, err: error})
        }
    } else {
        return res.status(401).json({ status: -1 });
    }
}
const deleteSong = async (req, res) => {
    const { idSong } = req.body;
    if (idSong) {
        try {
            let song = await Song.findOne({ _id: idSong });
            if (song) {
                await Song.deleteOne({_id: idSong});
                return res.status(200).json({ status: 1, dataSong: song });
            } else {
                return res.status(401).json({ status: 0 });
            }
        } catch (error) {
            return res.status(401).json({status: 0, err: error})
        }
        
    } else {
        return res.status(401).json({ status: -1 });
    }
}
const editSong = async (req, res) => {
    const { idSong, nameSong, content, dateCreate, singer } = req.body;
    if (idSong && nameSong) {
        try {
            let song = await Song.findOne({ _id: idSong });
            if (song) {
                let songData = await Song.updateOne({ _id: idSong }, { nameSong, content, dateCreate, singer });
                song = await Song.findOne({ _id: idSong });
                return res.status(200).json({ status: 1, songData: song });
            } else {
                return res.status(401).json({ status: 0 });
            }
        } catch (error) {
            return res.status(401).json({status: 0, err: error})
        }
    }else {
        return res.status(401).json({ status: -1 });
    }
}
module.exports = {
    createSong,
    deleteSong,
    editSong
}