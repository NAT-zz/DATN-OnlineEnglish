import express from 'express';
import {
    registerUser,
    getAllUsers,
    loginUser,
    verifyAccount,
    resendLink,
    logoutUser,
    generateTokens,
    forgotPassword,
    resetPassword,
    editProfile,
    checkAuth,
    deleteUser,
} from '../app/controllers/User.controller.js';
import multer from 'multer';
import { verifyToken, verifyRefreshToken, verifyPermission } from './auth.js';
import { ROLES } from '../utils/Constants.js';

const router = express.Router();
const fileUpload = multer();
router.get('/users', getAllUsers);
router.delete('/:id', deleteUser);

router.get('/check-auth', verifyToken, checkAuth);
router.post('/register', registerUser);
router.get('/verify-email/:email/:token', verifyAccount);
router.post('/resend', resendLink);
router.post('/login', loginUser);
router.get('/logout', verifyToken, logoutUser);

router.post('/token', verifyRefreshToken, generateTokens);

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
