const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    grammarIds: [ Number ]
});

module.exports = mongoose.model('Test', testSchema);