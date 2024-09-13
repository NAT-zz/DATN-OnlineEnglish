const mongoose = require('mongoose');
const { RATE_TYPE } = require('../utils/Constants');

const rateSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    idType: {
        type: Number,
        require: true  
    },
    type: {
        type: String,
        enum: [ RATE_TYPE.COURSE, RATE_TYPE.TIP, RATE_TYPE.TOPIC ],
        require: true,
    },
    content: [
        {
            idUser: Number,
            rateCount: Number
        }
    ]
});

module.exports = mongoose.model('Rate', rateSchema);