import mongoose from 'mongoose';
import { RATE_TYPE } from '../utils/Constants.js';

const commentSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    commentType: {
        type: String,
        enum: [RATE_TYPE.COURSE, RATE_TYPE.TOPIC, RATE_TYPE.TIP],
    },
    idType: {
        type: Number,
        required: true,
    },
    content: [
        {
            idUser: Number,
            content: String,
            time: Date,
        },
    ],
});

export default mongoose.model('Comment', commentSchema);
