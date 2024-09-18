import mongoose from 'mongoose';
import { RATE_TYPE } from '../utils/Constants.js';

const rateSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    idType: {
        type: Number,
        require: true,
    },
    type: {
        type: String,
        enum: [RATE_TYPE.COURSE, RATE_TYPE.TIP, RATE_TYPE.TOPIC],
        require: true,
    },
    content: [
        {
            idUser: Number,
            rateCount: Number,
        },
    ],
});

export default mongoose.model('Rate', rateSchema);
