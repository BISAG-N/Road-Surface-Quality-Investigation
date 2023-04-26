const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    road: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Road",
    },
    distress: Object,
    severity: String,
    image: [String],
},{ timestamps: true })

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;