import mongoose from 'mongoose';
import { TOKENS } from '../utils/Constants.js';

const tokenSchema = new mongoose.Schema({
    _userId: {
        type: Number,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [TOKENS.EMAIL_VERIFY, TOKENS.PASSWORD_RESET],
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 },
    },
});

export default mongoose.model('Token', tokenSchema);
