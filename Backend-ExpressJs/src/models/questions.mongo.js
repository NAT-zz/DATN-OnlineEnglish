import mongoose from 'mongoose';
import { QUESTION_TYPE } from '../utils/Constants.js';
import random from 'mongoose-random';

const questionsSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    sentence: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: [QUESTION_TYPE.FILL, QUESTION_TYPE.SELECT, QUESTION_TYPE.LISTEN],
        default: QUESTION_TYPE.SELECT,
    },
    media: {
        type: String,
        required: false,
    },
});
questionsSchema.plugin(random, { path: 'r' });

export default mongoose.model('Question', questionsSchema);
