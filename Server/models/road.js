const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    name: {
        type:String,
        required: [true,"Road Name is Required"],
    },
    district: {
        type:String,
        required: [true,"Road Name is Required"],
    },
    state: {
        type:String,
        required: [true,"Road Name is Required"],

    },

    distress: Object,
    
    image: [String],
    // imageId: String,
},{ timestamps: true })

const Road = mongoose.model('Road', roadSchema);

module.exports = Road;