import jwt from 'jsonwebtoken';
import { CONFIG } from '../utils/Constants.js';
import { makeSuccessResponse } from '../utils/Response.js';
import { getValue } from '../services/redis.js';
import { StatusCodes } from 'http-status-codes';
import users from '../models/users.mongo.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
            message: 'No token provided',
        });
    }
    try {
        const decoded = jwt.verify(token, CONFIG.JWT_ACCESS_SECRET);
        // {
        //     userId: '66eeef16c0079a4d5b4d2625',
        //     role: 'STUDENT',
        //     iat: 1726934806,
        //     exp: 1726935106
        //   }
        console.log(decoded);

        if (!decoded || (await getValue(decoded.userId))) {
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'Token is invalid or expired',
            });
        }

        const user = await users.findById(decoded.userId).select('-password');
        if (!(user && user instanceof users)) {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'User not found',
            });
        }

        req.userData = decoded;

        next();
    } catch (error) {
        console.log('Error is verifying token: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error',
        });
    }
};

const verifyPermission = (reqRole) => {
    //token verifed
    return (req, res, next) => {
        const role = req?.userData?.role;
        if (role) {
            if (
                !reqRole.find((valRole) => {
                    return valRole === role;
                })
            )
                return makeSuccessResponse(res, 401, {
                    message: 'permission not allowed',
                });
            next();
        } else {
            return makeSuccessResponse(res, 401, {
                message: 'no role found',
            });
        }
    };
};

export { verifyToken, verifyPermission };
