import mongoose from 'mongoose';
import random from 'mongoose-random';
import { LESSON_TYPE } from '../utils/Constants.js';

const lessonSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    topic: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    tasks: {
        type: [Number],
        default: [],
    },
    media: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: [LESSON_TYPE.LESSON, LESSON_TYPE.TASKS],
        default: LESSON_TYPE.TASKS,
        required: true,
    },
    publicDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    taskEndDate: {
        type: Date,
        default: Date.now + (24 * 3600 * 1000),
        required: false,
    }
});
lessonSchema.plugin(random, { path: 'r' });

export default mongoose.model('Lesson', lessonSchema);
