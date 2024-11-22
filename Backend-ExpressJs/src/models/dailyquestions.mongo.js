import mongoose from 'mongoose';

const dailyquestionsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    word: {
        type: String,
        required: true,
        unique: true,
    },
    definition: {
        type: String,
    },
    pronounLink: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    question: {
        type: String,
    },
});

export default mongoose.model('Dailyquestion', dailyquestionsSchema);
