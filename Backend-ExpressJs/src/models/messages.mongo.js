import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        senderId: {
            type: Number,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: Number,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
