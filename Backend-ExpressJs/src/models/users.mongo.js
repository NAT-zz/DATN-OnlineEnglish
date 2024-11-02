import mongoose from 'mongoose';
import { ROLES } from '../utils/Constants.js';

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
        minLength: 3,
    },
    birthDate: {
        type: Date,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: [ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER],
        default: ROLES.STUDENT,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
    //achivements
});

export default mongoose.model('User', userSchema);
