const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    category: {
        type: String,
    }
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;