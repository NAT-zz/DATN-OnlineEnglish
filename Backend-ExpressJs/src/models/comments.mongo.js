const mongoose = require('mongoose');
const { RATE_TYPE } = require('../utils/Constants');

const commentSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    commentType: {
        type: String,
        enum: [ RATE_TYPE.COURSE, RATE_TYPE.TOPIC, RATE_TYPE.TIP ]
    },
    idType: {
        type: Number,
        required: true
    },
    content: [
        {
            idUser: Number,
            content: String,
            time: Date
        }
    ]
});

module.exports = mongoose.model('Comment', commentSchema);