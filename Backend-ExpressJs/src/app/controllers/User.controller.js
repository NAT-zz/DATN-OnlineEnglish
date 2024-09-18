import { makeSuccessResponse } from '../../utils/Response.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { StatusCodes } from 'http-status-codes';

import users from '../../models/users.mongo.js';
import tokens from '../../models/tokens.mongo.js';
import { redisClient, getValue, setValue } from '../../services/redis.js';
import { findMaxId } from '../../models/users.model.js';
import { CONFIG, TOKENS } from '../../utils/Constants.js';
import { saveUser } from '../../models/users.model.js';
import { streamUpload } from '../../models/medias.model.js';

import { validateEmail } from '../../utils/Validate.js';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'olivertuan1310@gmail.com',
        pass: 'pykwzozcafkwbfhz',
    },
});

const firstTes = (req, res) => {
    return makeSuccessResponse(res, StatusCodes.OK, {
        data: {
            ok: req.userData,
        },
    });
};

const registerUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.username)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        const reqEmail = req.body.email.trim();
        const reqPassword = req.body.password.trim();
        const reqUsername = req.body.username.trim();
        const reqFullname = req.body?.fullname?.trim()
            ? req.body.fullname
            : null;
        const reqBirthdate = req.body?.birthdate ? req.body.birthdate : null;

        if (!validateEmail(reqEmail))
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Invalid email',
            });

        const getUser = await users.findOne({
            $or: [{ email: reqEmail }, { userName: reqUsername }],
        });

        if (getUser) {
            // if user exist in db
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'This email address / username is already existed.',
            });
        } else {
            const genId = Number((await findMaxId()) + 1);
            const user = new users({
                id: genId,
                fullName: reqFullname,
                email: reqEmail,
                userName: reqUsername,
                passWord: bcrypt.hashSync(reqPassword, 10),
                birthDate: reqBirthdate,
            });
            const newUser = await user.save();

            if (newUser instanceof users && newUser) {
                const token = new tokens({
                    _userId: newUser.id,
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.EMAIL_VERIFY,
                });
                const newToken = await token.save();

                if (newToken instanceof tokens && newToken) {
                    // send mail
                    const mailOptions = {
                        from: 'no-reply@example.com',
                        to: newUser.email,
                        subject: 'Account Verification Link',
                        text:
                            'Hello ' +
                            newUser.userName +
                            ',\n\n' +
                            'Please verify your account by clicking the link: \nhttp://' +
                            req.headers.host +
                            '/api/' +
                            'user' +
                            '/confirmation/' +
                            newUser.email +
                            '/' +
                            token.token +
                            '\n\nThank You!\n',
                    };

                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            return makeSuccessResponse(
                                res,
                                StatusCodes.INTERNAL_SERVER_ERROR,
                                {
                                    message:
                                        'Technical Issue!, Please click on resend for verify your Email.',
                                },
                            );
                        }

                        return makeSuccessResponse(res, StatusCodes.OK, {
                            message:
                                'A verification email has been sent to ' +
                                newUser.email +
                                '. It will be expire after 1 minute. If you not get verification Email click on resend.',
                        });
                    });
                } else throw new Error('Something went wrong');
            } else throw new Error('Something went wrong');
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        const reqEmail = req.body.email.trim();
        const reqPasword = req.body.password.trim();

        const getUser = await users.findOne({ email: reqEmail });
        if (!getUser) {
            // if email not found in db
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message:
                    'The email address ' +
                    reqEmail +
                    ' is not associated with any account. please check and try again!',
            });
        } else if (!bcrypt.compareSync(reqPasword, getUser.passWord)) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Wrong password',
            });
        } else if (!getUser.status) {
            // if email not verified
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message:
                    'Your Email has not been verified. Please click on resend',
            });
        } else {
            const accessToken = jwt.sign(
                {
                    sub: getUser.userName,
                    role: getUser.role,
                },
                JWT_ACCESS_SECRET,
                {
                    expiresIn: JWT_ACCESS_TIME,
                },
            );
            const refreshToken = await generateRefreshToken(
                getUser.userName,
                getUser.role,
            );

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'User successfully logged in.',
                data: {
                    userData: {
                        username: getUser.userName,
                        fullname: getUser.fullName,
                        email: getUser.email,
                        role: getUser.role,
                        birthdate: getUser.birthDate,
                        coin: getUser.coin,
                        avatar: getUser.avatar,
                    },
                    token: {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    },
                },
            });
        }
    } catch (error) {
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const verifyAccount = async (req, res) => {
    try {
        if (!req.params.email || !req.params.token) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        }

        const getToken = await tokens.findOne({
            token: req.params.token,
            type: TOKENS.EMAIL_VERIFY,
        });

        if (getToken) {
            const getUser = await users.findOne({
                id: getToken._userId,
                email: req.params.email,
            });
            if (getUser instanceof users && getUser) {
                if (getUser.status) {
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        message: 'User has been already verified. Please Login',
                    });
                } else {
                    const updateUser = await users.updateOne(
                        {
                            email: req.params.email,
                        },
                        {
                            status: true,
                        },
                    );

                    if (updateUser.modifiedCount == 1) {
                        await tokens.deleteOne({ _userId: getUser.id });
                        return makeSuccessResponse(res, StatusCodes.OK, {
                            message:
                                'Your account has been successfully verified',
                        });
                    }
                }
            } else {
                return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                    message:
                        'We were unable to find a user for this verification. Please SignUp!',
                });
            }
        } else {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message:
                    'Your verification link may have expired. Please click on resend for verify your Email.',
            });
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const resendLink = async (req, res) => {
    try {
        if (!req.body.email)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });

        const reqEmail = req.body.email.trim();
        const getUser = await users.findOne({ email: reqEmail });

        if (!validateEmail(reqEmail))
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Invalid email',
            });

        if (getUser instanceof users && getUser) {
            if (getUser.status)
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message:
                        'This account has been already verified. Please log in.',
                });
            else {
                // delete the old ones
                await tokens.deleteMany({
                    _userId: getUser.id,
                    type: TOKENS.EMAIL_VERIFY,
                });

                // generate token and save
                const token = new tokens({
                    _userId: getUser.id,
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.EMAIL_VERIFY,
                });

                const newToken = await token.save();

                // send mail
                if (newToken instanceof tokens && newToken) {
                    const mailOptions = {
                        from: 'no-reply@example.com',
                        to: getUser.email,
                        subject: 'Account Verification Link',
                        text:
                            'Hello ' +
                            getUser.userName +
                            ',\n\n' +
                            'Please verify your account by clicking the link: \nhttp://' +
                            req.headers.host +
                            '/api/' +
                            'user' +
                            '/confirmation/' +
                            getUser.email +
                            '/' +
                            newToken.token +
                            '\n\nThank You!\n',
                    };

                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            return makeSuccessResponse(
                                res,
                                StatusCodes.INTERNAL_SERVER_ERROR,
                                {
                                    message:
                                        'Technical Issue!, Please click on resend for verify your Email.',
                                },
                            );
                        }

                        return makeSuccessResponse(
                            res,
                            StatusCodes.BAD_REQUEST,
                            {
                                message:
                                    'A verification email has been sent to ' +
                                    getUser.email +
                                    '. It will be expire after 1 minutes. If you not get verification Email click on resend token.',
                            },
                        );
                    });
                } else throw new Error('Something went wrong');
            }
        } else {
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message:
                    'We were unable to find a user with that email. Make sure your Email is correct!',
            });
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    const username = req.userData.sub;
    const token = req.token;

    // remove the resfesh token
    await redisClient.del(username.toString());

    // if access_token is till valid => blacklist the current access_token
    setValue('BL_' + username.toString(), token);

    return makeSuccessResponse(res, StatusCodes.OK, {
        message: 'Logout success',
    });
};

const generateRefreshToken = async (username, role) => {
    const refreshToken = jwt.sign(
        {
            sub: username,
            role: role,
        },
        JWT_REFRESH_SECRET,
        {
            expiresIn: JWT_REFRESH_TIME,
        },
    );

    try {
        // const checkToken = await getValue(username.toString());
        // if(checkToken)
        setValue(username.toString(), JSON.stringify({ token: refreshToken }));
    } catch (error) {
        console.log(error.message);
    }

    return refreshToken;
};

const generateTokens = async (req, res) => {
    const { sub, role } = req.userData;

    const accessToken = jwt.sign(
        {
            sub: sub,
            role: role,
        },
        JWT_ACCESS_SECRET,
        {
            expiresIn: JWT_ACCESS_TIME,
        },
    );
    const refreshToken = await generateRefreshToken(sub, role);

    return makeSuccessResponse(res, StatusCodes.OK, {
        message: 'Success',
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
};

const forgotPassword = async (req, res) => {
    try {
        if (!req.body.email)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing email',
            });
        else if (!validateEmail(req.body.email)) {
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Invalid email',
            });
        } else {
            const getUser = await users.findOne({
                email: req.body.email.trim(),
            });

            if (getUser && getUser instanceof users) {
                const token = new tokens({
                    _userId: getUser.id,
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.PASSWORD_RESET,
                });
                const newToken = await token.save();

                if (newToken instanceof tokens && newToken) {
                    const url =
                        '\nhttp://' +
                        req.headers.host +
                        '/user' +
                        '/reset-password/' +
                        newToken.token;
                    const mailOptions = {
                        from: 'no-reply@example.com',
                        to: getUser.email,
                        subject: 'Password reset',
                        html: `Hello ${getUser.userName} <br></br><br></br> Click <a href="${url}">here</a> to reset your password <br></br><br></br> Thank You!`,
                    };

                    transporter.sendMail(mailOptions, (err) => {
                        if (err) {
                            return makeSuccessResponse(
                                res,
                                StatusCodes.INTERNAL_SERVER_ERROR,
                                {
                                    message:
                                        'Technical Issue!, Please try again.',
                                },
                            );
                        }

                        return makeSuccessResponse(res, StatusCodes.OK, {
                            message:
                                'An email has been sent to ' +
                                getUser.email +
                                '. It will be expired after 1 minute.',
                        });
                    });
                } else throw new Error('Something went wrong');
            } else
                throw new Error(
                    'No account corresponding with that email was found',
                );
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const editProfile = async (req, res) => {
    // username
    // fullname

    // current password // required if changing password
    // password
    // confirm password

    // avatar
    // birthdate
    try {
        if (!req.body || !req.body.email)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Email must be provided',
            });
        const user = await users.findOne(
            { email: req.body.email.trim() },
            '-_id -__v',
        );
        if (user && user.userName === req.userData.sub) {
            Object.assign(user, {
                userName: req.body?.username
                    ? req.body.username
                    : user.userName,
                fullName: req.body?.fullname
                    ? req.body.fullname
                    : user.fullName,
                birthDate: req.body?.birthdate
                    ? req.body.birthdate
                    : user.birthDate,
                avatar: req?.file
                    ? (await streamUpload(req.file)).url
                    : user.avatar,
            });
            if (req.body.password) {
                if (!req.body.currentpassword)
                    throw new Error(
                        'Current password needed for changing password',
                    );
                else {
                    if (req.body.password !== req.body.confirmpassword)
                        throw new Error(`Password not match`);
                    else {
                        if (
                            bcrypt.compareSync(
                                req.body.currentpassword.trim(),
                                user.passWord,
                            )
                        ) {
                            Object.assign(user, {
                                passWord: req.body.password.trim(),
                            });
                        } else throw new Error('Wrong password');
                    }
                }
            }
            const updatedUser = await saveUser(user);
            if (updatedUser)
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: 'Information updated',
                    data: {
                        username: updatedUser.userName,
                        fullname: updatedUser.fullName,
                        email: updatedUser.email,
                        role: updatedUser.role,
                        avatar: updatedUser.avatar,
                        coin: updatedUser.coin,
                        achivement: updatedUser.achivement,
                    },
                });
            throw new Error('Update failed');
        } else throw new Error('Incorrect user information');
    } catch (error) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: error.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmpassword)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Password not match',
            });
        const passwordReset = await tokens.findOne({
            type: TOKENS.PASSWORD_RESET,
            token: req.body.token,
        });
        if (passwordReset instanceof tokens && passwordReset) {
            const getUser = await users.findOne({
                id: passwordReset._userId,
            });
            if (getUser instanceof users && getUser) {
                getUser.passWord = bcrypt.hashSync(
                    req.body.password.trim(),
                    10,
                );
                await getUser.save();
                await tokens.deleteOne({
                    type: TOKENS.PASSWORD_RESET,
                    _userId: passwordReset._userId,
                });
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message:
                        'Reset password successfully, please login with your new password',
                });
            } else throw new Error('User not found');
        } else {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message:
                    'Your reset password link may have expired. Please try again.',
            });
        }
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const getProfile = async (req, res) => {};

export {
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
    getProfile,
};
