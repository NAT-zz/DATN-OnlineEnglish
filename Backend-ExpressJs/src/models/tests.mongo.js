import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    tasks: {
        type: [Number],
        default: [],
    },
    publicDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: () => Date.now() + 3600000, //1 hour
    },
    time: {
        type: Number,
        default: 30,
    },
});

export default mongoose.model('Test', testSchema);
