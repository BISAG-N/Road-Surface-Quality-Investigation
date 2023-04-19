const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    video: String,
    videoId: String
},{ timestamps: true })

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;