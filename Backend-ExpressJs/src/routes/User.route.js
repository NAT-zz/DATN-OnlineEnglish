import express from 'express';
import {
    firstTes,
    registerUser,
    loginUser,
    verifyAccount,
    resendLink,
    logoutUser,
    generateTokens,
    forgotPassword,
    resetPassword,
    editProfile,
} from '../app/controllers/User.controller.js';
import { verifyToken, verifyRefreshToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';

const router = express.Router();
router.get('/', firstTes);
router.get('/test', verifyToken, verifyPermission([ROLES.ADMIN]), firstTes);

router.get('/logout', verifyToken, logoutUser);
router.get('/confirmation/:email/:token', verifyAccount);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend', resendLink);
router.post('/token', verifyRefreshToken, generateTokens);

import multer from 'multer';
const fileUpload = multer();

router.post(
    '/edit',
    fileUpload.single('avatar'),
    verifyToken,
    verifyPermission([ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER]),
    editProfile,
);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//achivement
export default router;
