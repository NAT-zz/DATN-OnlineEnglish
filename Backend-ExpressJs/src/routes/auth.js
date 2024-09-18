import jwt from 'jsonwebtoken';
import { ROLES, CONFIG } from '../utils/Constants.js';
import { makeSuccessResponse } from '../utils/Response.js';
import { redisClient, getValue } from '../services/redis.js';

const verifyToken = async (req, res, next) => {
    try {
        // Bearer token
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, CONFIG.JWT_ACCESS_SECRET);
        // { sub: 'admin', role: 'ADMIN', iat: 1668352408, exp: 1668352438 }
        console.log(decoded);

        // if role is correct
        req.userData = decoded;
        req.token = token;

        // verify bl access token
        const getToken = await redisClient.get('BL_' + decoded.sub.toString());
        if (getToken === token)
            return makeSuccessResponse(res, 401, {
                message: 'Blacklisted token',
            });
        next();
    } catch (error) {
        return makeSuccessResponse(res, 401, {
            message: 'Your session is not valid',
            data: {
                message: error.message,
                data: error,
            },
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
    // vefiry token successfully
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
