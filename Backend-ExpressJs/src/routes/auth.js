import jwt from 'jsonwebtoken';
import { CONFIG } from '../utils/Constants.js';
import { makeSuccessResponse } from '../utils/Response.js';
import { getValue } from '../services/redis.js';
import { StatusCodes } from 'http-status-codes';
import storages from '../models/storage.mongo.js';
import users from '../models/users.mongo.js';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || req.token;
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

        if (!decoded || (await getValue(req.cookies.token))) {
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

        req.userData = {
            ...decoded,
            id: user.id,
        };

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
                return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                    message: 'Permission not allowed',
                });
            next();
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'No role found',
            });
        }
    };
};

const verifyRights = (type) => {
    return async (req, res, next) => {
        const userId = req?.userData?.id;
        const id = req.params.id || req.query.id;

        if (userId) {
            const getStorage = await storages.findOne({ userId: userId });
            let result = false;
            if (getStorage && getStorage instanceof storages) {
                switch (type) {
                    case 'question':
                        result = getStorage.questions.includes(id);
                        break;
                    case 'lesson':
                        result = getStorage.lessons.includes(id);
                        break;
                    case 'test':
                        result = getStorage.tests.includes(id);
                        break;
                    case 'class':
                        result = getStorage.classes.includes(id);
                        break;
                    default:
                        break;
                }
            }
            if (!result)
                return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                    message: 'You are not allowed to access this data',
                });
            next();
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'No id found',
            });
        }
    };
};

export { verifyToken, verifyPermission, verifyRights };
