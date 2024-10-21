import express from 'express';
import {
    registerUser,
    getAllUsers,
    loginUser,
    verifyAccount,
    resendLink,
    logoutUser,
    forgotPassword,
    resetPassword,
    editProfile,
    checkAuth,
    deleteUser,
    deleteLastestUser,
    getMessages,
    sendMessage,
} from '../app/controllers/User.controller.js';
import multer from 'multer';
import { verifyToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';

const router = express.Router();
const fileUpload = multer();
// for dev
router.get('/users', getAllUsers);
router.delete('/:id', deleteUser);
router.post('/deleteLastest', deleteLastestUser);

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

// users
// get teachers/students studying
// get all teachers
// router.get('/teachers', verifyToken, getTeachers)
// achivements
// coins
export default router;
