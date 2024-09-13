const mongoose = require('mongoose');
const random = require('mongoose-random');

const mediaSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    titlePicture: {
        type: String,
        unique: true
    },
    transcript: {
        type: String,
        unique: true
    },
    audio: {
        type: String,
    }
});

module.exports = mongoose.model('Media', mediaSchema);