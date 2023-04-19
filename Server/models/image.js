const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    image: String,
    imageId: String
},{ timestamps: true })

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;