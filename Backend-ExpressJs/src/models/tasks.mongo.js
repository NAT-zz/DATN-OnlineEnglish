import mongoose from 'mongoose';
import random from 'mongoose-random';
import { TASK_TYPE } from '../utils/Constants.js';

const taskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    task: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        default: 'General',
    },
    questions: {
        type: [Number],
        default: [],
    },
    taskType:{
        type: String,
        enum: [TASK_TYPE.MULTIPLE_CHOICE, TASK_TYPE.ESSAY],
        default: TASK_TYPE.MULTIPLE_CHOICE,
    },
    media: {
        type: String,
        required: false,
    },
});
taskSchema.plugin(random, { path: 'r' });

export default mongoose.model('Task', taskSchema);
