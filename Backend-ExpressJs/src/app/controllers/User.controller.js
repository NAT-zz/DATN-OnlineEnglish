import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { makeSuccessResponse } from '../../utils/Response.js';

import conversations from '../../models/conversations.mongo.js';
import messages from '../../models/messages.mongo.js';
import tokens from '../../models/tokens.mongo.js';
import { findMaxId, saveUser } from '../../models/users.model.js';
import { findMaxId as findMaxIdMessage } from '../../models/messages.model.js';
import users from '../../models/users.mongo.js';
import { streamUpload } from '../../services/fileUpload.js';
import { ROLES, TOKENS } from '../../utils/Constants.js';

import mongoose from 'mongoose';
import {
    sendPasswordResetEmail,
    sendVerificationEmail,
} from '../../services/email.js';
import { setValue } from '../../services/redis.js';
import { getReceiverSocketId } from '../../services/socket.js';
import { io } from '../../services/socket.js';
import { generateTokenAndSetCookie } from '../../utils/GenerateTokens.js';
import { validateEmail } from '../../utils/Validate.js';

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
            message: 'Error in getting users.',
        });
    }

    try {
        const user = await users.findByIdAndDelete(id);
        if (!user)
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'User not found',
            });
        else
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'User deleted successfully',
            });
    } catch (error) {
        console.log('Error in deleting user: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const deleteLastestUser = async (req, res, next) => {
    try {
        const getUsers = await users.findOneAndDelete({}).sort('-id').limit(1);
        return makeSuccessResponse(res, StatusCodes.OK, {
            message: 'Success',
        });
    } catch (error) {
        console.log('Error in deleting latest user: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message,
        });
    }
};

const checkAuth = async (req, res, next) => {
    try {
        const user = await users
            .findById(req.userData.userId)
            .select('-passWord');
        if (!user) {
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'User not found.',
            });
        }
        return makeSuccessResponse(res, StatusCodes.OK, {
            data: { user },
        });
    } catch (err) {
        console.log('Error in check-auth: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error',
        });
    }
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

        if (!validateEmail(reqEmail))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Invalid email',
            });

        const getUser = await users.findOne({ email: reqEmail });

        if (getUser) {
            // if user exist in db
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'This email address is already existed.',
            });
        } else {
            const genId = Number((await findMaxId()) + 1);
            const user = new users({
                id: genId,
                userName: reqUsername,
                email: reqEmail,
                passWord: bcrypt.hashSync(reqPassword, 10),
            });
            const newUser = await user.save();

            // jwt token saved in cookie
            const accessToken = generateTokenAndSetCookie(res, {
                userId: newUser._id,
                role: newUser.role,
            });

            if (newUser instanceof users && newUser) {
                //generate email verify token
                const token = new tokens({
                    _userId: newUser.id,
                    token: crypto.randomBytes(16).toString('hex'),
                    type: TOKENS.EMAIL_VERIFY,
                });
                const newToken = await token.save();

                if (newToken instanceof tokens && newToken) {
                    // send mail
                    await sendVerificationEmail(req, newUser, token);
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        data: {
                            user: {
                                ...newUser._doc,
                                passWord: undefined,
                            },
                            token: accessToken,
                        },
                        message:
                            'Check your email for verification, the link will be expired after 1 minute',
                    });
                } else throw new Error('Something went wrong');
            } else throw new Error('Something went wrong');
        }
    } catch (error) {
        console.log('Error in signing up:', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
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
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message:
                    'The email address ' +
                    reqEmail +
                    ' is not associated with any account. please check and try again!',
            });
        } else if (!bcrypt.compareSync(reqPasword, getUser.passWord)) {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'Check you credentials and try again',
            });
        } else {
            const accessToken = generateTokenAndSetCookie(res, {
                userId: getUser._id,
                role: getUser.role,
            });

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'User successfully logged in.',
                data: {
                    user: {
                        ...getUser._doc,
                        passWord: undefined,
                    },
                    token: accessToken,
                },
            });
        }
    } catch (error) {
        console.log('Error in logging in', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
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
                        'We were unable to find a user for this verification. Please Signup!',
                });
            }
        } else {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message:
                    'Your verification link may have expired. Please click on resend for verify your Email.',
            });
        }
    } catch (error) {
        console.log('Error in verification: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
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
                        'This account has been already verified. Please Login.',
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
                    // send mail
                    await sendVerificationEmail(req, getUser, newToken);
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        data: {
                            user: {
                                ...getUser._doc,
                                passWord: undefined,
                            },
                        },
                        message:
                            'A verification email has been sent to ' +
                            newUser.email +
                            '. It will be expire after 1 minute. If you not get verification Email click on resend.',
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
        console.log('Error in resend link: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, try again later!',
        });
    }
};

const logoutUser = async (req, res) => {
    // if token is till valid => blacklist the current token
    setValue(req.userData.token, 'BL');
    res.clearCookie('token');

    return makeSuccessResponse(res, StatusCodes.OK, {
        message: 'Logout success',
    });
};

const forgotPassword = async (req, res) => {
    try {
        if (!req.body.email)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing email',
            });
        else if (!validateEmail(req.body.email)) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
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
                    await sendPasswordResetEmail(
                        req,
                        getUser.email,
                        newToken.token,
                    );
                    return makeSuccessResponse(res, StatusCodes.OK, {
                        message:
                            'A reset password link has been sent to your email if it exists. The link will be expired in 1 minute',
                    });
                } else throw new Error('Something went wrong');
            } else
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message:
                        'No account corresponding with that email was found',
                });
        }
    } catch (error) {
        console.log('Error in forgot-email: ', error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error',
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
                message: 'Your reset password link may have expired',
            });
        }
    } catch (error) {
        console.log('Error in reset password: ', error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const editProfile = async (req, res) => {
    try {
        if (!req.body.email)
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
                birthDate: req.body?.birthdate
                    ? req.body.birthdate
                    : user.birthDate,
                avatar: req.body?.avatar ? req.body.avatar : user.avatar,
                description: req.body?.description
                    ? req.body.description
                    : user.description,
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
                    data: updatedUser,
                });
            throw new Error('Update failed');
        } else throw new Error('Incorrect user information');
    } catch (error) {
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: error.message,
        });
    }
};

const getMessages = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        }

        const { id: userToChatId } = req.params;
        const senderId = req.userData.id;

        const conversation = await conversations.findOne({
            participants: { $all: [senderId, userToChatId] },
        });

        if (!conversation) return makeSuccessResponse(res, StatusCodes.OK, {});
        let messageData = [];
        for (const messageId of conversation.messages) {
            const getMessage = await messages.findOne(
                { id: messageId },
                '-_id -__v',
            );
            if (getMessage && getMessage instanceof messages) {
                messageData.push(getMessage);
            }
        }

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: messageData,
        });
    } catch (error) {
        console.log('Error in getMessages: ', error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const sendMessage = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information',
            });
        }

        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.userData.id;

        let conversation = await conversations.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await conversations.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new messages({
            id: Number((await findMaxIdMessage()) + 1),
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage.id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage); // send events to specific client
        }

        return makeSuccessResponse(res, StatusCodes.CREATED, {
            data: {
                newMessage,
            },
        });
    } catch (error) {
        console.log('Error in sendMessage: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

const getStudyings = async (req, res) => {
    const userId = req?.userData?.userId;
    if (userId) {
        try {
            const getUser = await users.findOne({ _id: userId });

            if (getUser && getUser instanceof users) {
                let studyings = [];
                console.log('####', getUser.studying);
                for (let id of getUser.studying) {
                    console.log('####', id);
                    let user = await users.findOne({ id: id });
                    if (user && user instanceof users) {
                        studyings.push({
                            ...user._doc,
                            passWord: undefined,
                        });
                    }
                }
                return makeSuccessResponse(res, StatusCodes.OK, {
                    data: studyings,
                });
            } else {
                return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                    message: 'User not found',
                });
            }
        } catch (err) {
            console.error('Error in getStudyings: ', err.message);
            return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
                message: 'Server error, please try again later!',
            });
        }
    } else {
        return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
            message: 'Missing required information',
        });
    }
};

const getTeachers = async (req, res) => {
    try {
        const getUsers = await users
            .find({ role: ROLES.TEACHER })
            .select('-passWord');
        return makeSuccessResponse(res, StatusCodes.OK, {
            data: getUsers,
        });
    } catch (err) {
        console.error('Error in getTeachers: ', err.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later',
        });
    }
};

export {
    checkAuth,
    deleteLastestUser,
    deleteUser,
    editProfile,
    forgotPassword,
    getMessages,
    getStudyings,
    getTeachers,
    loginUser,
    logoutUser,
    registerUser,
    resendLink,
    resetPassword,
    sendMessage,
    verifyAccount,
};
