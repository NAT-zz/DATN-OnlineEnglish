import jwt from 'jsonwebtoken';
import { setValue } from '../services/redis.js';
import { CONFIG } from '../utils/Constants.js';

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 90000).toString();
};

const generateTokenAndSetCookie = (res, userData) => {
    const accessToken = jwt.sign(
        {
            userId: userData.userId,
            role: userData.role,
        },
        CONFIG.JWT_ACCESS_SECRET,
        {
            expiresIn: CONFIG.JWT_ACCESS_TIME,
        },
    );

    res.cookie('token', accessToken, {
        httpOnly: true, // cannot be accessed be javascript
        secure: process.env.NODE_ENV.trim() == 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return accessToken;
};

export {
    generateVerificationCode,
    generateTokenAndSetCookie,
};
