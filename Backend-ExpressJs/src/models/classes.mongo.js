import mongoose from 'mongoose';
import { LEVEL } from '../utils/Constants.js';

const classSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    level: {
        type: String,
        enum: [LEVEL.A1, LEVEL.A2, LEVEL.B1, LEVEL.B2, LEVEL.C1, LEVEL.C2],
        default: LEVEL.A1,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    lessons: {
        type: [Number],
        default: [],
    },
    tests: {
        type: [Number],
        default: [],
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: () => Date.now() + 30 * 24 * 3600000, // 30 days
    },
});

export default mongoose.model('Class', classSchema);
