const express = require('express');
const router = express.Router();
const { firstTes, registerUser, loginUser, 
        verifyAccount, resendLink, logoutUser, generateTokens,
        forgotPassword, resetPassword, editProfile } = require('../app/controllers/User.controller.js');
const { verifyToken, verifyRefreshToken, verifyPermission } = require('./auth');
const { ROLES } = require('../utils/Constants');

router.get('/', firstTes);
router.get('/test',verifyToken, verifyPermission([ROLES.ADMIN]),  firstTes);

router.get('/logout', verifyToken, logoutUser);
router.get('/confirmation/:email/:token', verifyAccount);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend', resendLink);
router.post('/token', verifyRefreshToken, generateTokens);

const multer = require('multer');
const fileUpload = multer();

router.post('/edit', fileUpload.single('avatar'), verifyToken, verifyPermission([ROLES.ADMIN, ROLES.STUDENT, ROLES.TEACHER]), editProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//achivement
module.exports = router;