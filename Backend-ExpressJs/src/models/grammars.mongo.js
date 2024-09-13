const mongoose = require('mongoose');
const { QUESTION_TYPE, GRAMMAR_TYPE, COURSE, TASK_TYPE } = require('../utils/Constants');
const random = require('mongoose-random');

const grammarSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        require: true,
        unique: true
    },
    sentence: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    answers: [ String ], 
    grammarType: {
        type: String,
        enum: [ GRAMMAR_TYPE.CONVERSATION, GRAMMAR_TYPE.ED_ING, GRAMMAR_TYPE.ANY ],
        required: true
    },
    questionType: {
        type: String,
        enum: [ QUESTION_TYPE.FILL, QUESTION_TYPE.SELECT ],
        required: true
    },
    media: {
        type: Number,
        required: false
    },
    level: {
        type: String,
        enum: [ COURSE.A1, COURSE.A2, COURSE.B1, COURSE.B2, COURSE.C1 ],
        default: COURSE.C1
    },
    taskType: {
        type: String,
        enum: [ TASK_TYPE.FOR_TEST, TASK_TYPE.FOR_TOPIC ],
        default: TASK_TYPE.FOR_TEST
    }
});
grammarSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Grammar', grammarSchema);