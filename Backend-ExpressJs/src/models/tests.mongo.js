import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
        unique: true,
    },
    grammarIds: [Number],
});

export default mongoose.model('Test', testSchema);
