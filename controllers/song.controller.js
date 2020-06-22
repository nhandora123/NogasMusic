const Song = require('../models/song.model');

const createSong = async (req, res) => {
    const { nameSong, content, dateCreate } = req.body;
    if (nameSong && content && dateCreate) {
        let song = await Song.findOne({ nameSong, content, dateCreate });
        if (song) {
            return res.status(401).json({ status: -1 })
        } else {
            let songData = await Song.create(req.body);
            return res.status(200).json({ status: 1, songData: songData });
        }
    } else {
        return res.status(401).json({ status: 0 });
    }
}
// const deleteSong = async (req, res) => {
//     const { _id } = req.param;
// }
module.exports = {
    createSong
}