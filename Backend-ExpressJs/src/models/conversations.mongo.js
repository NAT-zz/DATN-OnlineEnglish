import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        participants: [
            {
                type: Number,
                ref: 'User',
            },
        ],
        messages: [
            {
                type: Number,
                ref: 'Message',
                default: [],
            },
        ],
        rate: {
            type: Number,
            required: false,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
