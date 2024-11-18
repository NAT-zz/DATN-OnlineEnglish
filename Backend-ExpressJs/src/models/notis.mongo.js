import mongoose from 'mongoose';

const notiSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        from: {
            type: Number,
            required: true,
        },
        to: {
            type: [Number],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('Noti', notiSchema);
