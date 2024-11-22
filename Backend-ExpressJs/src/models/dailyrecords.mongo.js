import mongoose from 'mongoose';

const dailyrecordsSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    todayStatus: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('Dailyrecord', dailyrecordsSchema);
