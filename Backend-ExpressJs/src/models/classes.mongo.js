import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
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
        default: Date.now
    },
    endDate: {
        type: Date,
        default: () => Date.now() + 30 * 24 * 3600000, // 30 days
    }
});

export default mongoose.model('Class', classSchema);
