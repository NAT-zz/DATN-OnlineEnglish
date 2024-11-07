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
    },
    { timestamps: true },
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
