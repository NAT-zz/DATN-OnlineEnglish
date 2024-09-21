import jwt from 'jsonwebtoken';
import { ROLES, CONFIG } from '../utils/Constants.js';
import { makeSuccessResponse } from '../utils/Response.js';
import { redisClient, getValue } from '../services/redis.js';
import { StatusCodes } from 'http-status-codes';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
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

        if (!decoded) {
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'Token is invalid or expired',
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

const verifyRefreshToken = async (req, res, next) => {
    const token = req.body?.token;
    if (!token)
        return makeSuccessResponse(res, 401, {
            message: 'Invalid request',
        });

    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        req.userData = decoded;
        // { sub: 'admin', role: 'ADMIN', iat: 1668352408, exp: 1668352438 }
        console.log(decoded);

        // verify if token is in store or not
        const getToken = await getValue(decoded.sub.toString());
        if (!getToken)
            return makeSuccessResponse(res, 401, {
                message: 'Token is not stored',
            });
        if (JSON.parse(getToken).token != token)
            return makeSuccessResponse(res, 401, {
                message: 'Token is not the same in the store',
            });
        next();
    } catch (error) {
        return makeSuccessResponse(res, 401, {
            message: error.message,
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

export { verifyToken, verifyRefreshToken, verifyPermission };
