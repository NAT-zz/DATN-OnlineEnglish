const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    idProvider: {
        type: Number,
        require: false,
        default: 1
    },
    name: {
        type: String,
        unique: true
    },
    preview: {
        type: String
    },
    picture: {
        type: String
    },
    content: [
        {
            title: String,
            content: [ String ]
        }
    ]
});

module.exports = mongoose.model('Tip', tipSchema);