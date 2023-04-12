const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId, 
    video: String,
    videoId: String
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;