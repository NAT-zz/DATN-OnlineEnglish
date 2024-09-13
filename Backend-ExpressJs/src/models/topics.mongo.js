const mongoose = require('mongoose');
const { SKILLS, COURSE } = require('../utils/Constants');
const random = require('mongoose-random');

const topicSchema = new mongoose.Schema({
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
        required: true
    },
    preview: {
        type: String
    },
    topicSkill: {
        type: String,
        enum: [ SKILLS.GRAMMAR, SKILLS.LISTENING, SKILLS.READING, SKILLS.SPEAKING, SKILLS.VOCABULARY, SKILLS.WRITING ],
        required: true
    },
    level: {
        type: String,
        enum: [ COURSE.A1, COURSE.A2, COURSE.B1, COURSE.B2, COURSE.C1 ]
    },
    instruction: {
        type: String,
        default: "Do the preparation task first. Then read the text and do the exercises."
    },
    preparationTask: {
        type: Number
    },
    tasks: {
        type: [ Number ]
    },
    media: {
        type: [ Number ]
    }
});
topicSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Topic', topicSchema);