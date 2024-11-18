import express from 'express';
import {
    registerUser,
    loginUser,
    verifyAccount,
    resendLink,
    logoutUser,
    forgotPassword,
    resetPassword,
    editProfile,
    checkAuth,
    getMessages,
    sendMessage,
    getStudyings,
    getTeachers,
    getNotis,
    createNoti,
    videoCallHandler,
} from '../app/controllers/User.controller.js';
import multer from 'multer';
import { verifyToken, verifyPermission, verifyRights } from './auth.js';
import { RIGHT_TYPE, ROLES } from '../utils/Constants.js';

const router = express.Router();
const fileUpload = multer();

// auth
router.get('/check-auth', verifyToken, checkAuth);
router.post('/register', registerUser);
router.get('/verify-email/:email/:token', verifyAccount);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', verifyToken, logoutUser);
router.post('/resend', resendLink);

// profile
router.post(
    '/edit',
    fileUpload.single('avatar'),
    verifyToken,
    verifyPermission([ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER]),
    editProfile,
);

// chat
router.get('/message/:id', verifyToken, getMessages);
router.post('/message/send/:id', verifyToken, sendMessage);

// video call
router.get('/video-call/:id', videoCallHandler);

// users
router.get('/studyings', verifyToken, getStudyings);
router.get('/teachers', getTeachers);

// notis
router.get('/notis', verifyToken, getNotis);
// create
router.post(
    '/noti/create',
    verifyToken,
    verifyPermission([ROLES.TEACHER]),
    verifyRights(RIGHT_TYPE.class),
    createNoti,
);

export default router;
