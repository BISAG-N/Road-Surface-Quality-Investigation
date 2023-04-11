const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId, 
    image: String,
    imageId: String
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;