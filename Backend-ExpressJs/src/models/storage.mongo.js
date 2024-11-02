import mongoose from 'mongoose';
import { ROLES } from '../utils/Constants.js';

const storageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    role:{
        type: String,
        enum: [ROLES.STUDENT, ROLES.TEACHER]
    },
    questions: {
        type: [Number],
        default: [],
    },
    tasks: {
        type: [Number],
        default: [],
    },
    lessons: {
        type: [Object],
        default: [],
    },
    tests: {
        type: [Object],
        default: [],
    },
    classes: {
        type: [Number],
        default: [],
    }
});

export default mongoose.model('Storage', storageSchema);