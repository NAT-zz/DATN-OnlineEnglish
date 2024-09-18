import mongoose from 'mongoose';
import random from 'mongoose-random';

const mediaSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    titlePicture: {
        type: String,
        unique: true,
    },
    transcript: {
        type: String,
        unique: true,
    },
    audio: {
        type: String,
    },
});

export default mongoose.model('Media', mediaSchema);
