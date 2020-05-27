const Song = require('../models/song.modal');

const createSong = async (req, res) => {
    const {nameSong, linkServer, dateCreate } = req.body;
    if(_id){
        let song = await Song.findOne({ nameSong, linkServer });
        if (song) {
            return req.status(401).json({status: -1})
        } else {
            let songData = await Song.create(req.body);
            return res.status(200).json({ status: 1, songData: songData });
        }
    } else {
        return res.status(401).json({ status: 0 });
    }
}