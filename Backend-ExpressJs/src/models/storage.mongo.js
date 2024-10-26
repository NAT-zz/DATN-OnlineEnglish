import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        unique: true,
        required: true,
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
        type: [Number],
        default: [],
    },
    tests: {
        type: [Number],
        default: [],
    },
    classes: {
        type: [Number],
        default: [],
    }
});

export default mongoose.model('Storage', storageSchema);