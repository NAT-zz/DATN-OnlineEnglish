const mongoose = require('mongoose');
const { ROLES, COURSE } = require('../utils/Constants') 

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    passWord: {
        type: String,
        required: true,
        minLength: 3,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthDate: {
        type: Date,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
        required: false
    },
    coin: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: [ ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER ],
        default: ROLES.STUDENT
    },
    achivement: {
        SelfStudy: [{
            topicId: [Number],
            courseType: {
                type: String,
                enum: [COURSE.A1, COURSE.B1, COURSE.B2, COURSE.C1],
            }
        }],  
        OnlineCourse: [
            {
                idCourse: Number,
                teacherId: Number
            }
        ]
    },
    status: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('User', userSchema);