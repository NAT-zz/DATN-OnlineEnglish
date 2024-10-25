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
        default: '',
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
    },
    publicDate: {
        type: Date,
        default: Date.now,
    },
    taskEndDate: {
        type: Date,
        default: () => Date.now() + 2 * 24 * 3600000, // 2 days
    }
});
lessonSchema.plugin(random, { path: 'r' });

export default mongoose.model('Lesson', lessonSchema);
