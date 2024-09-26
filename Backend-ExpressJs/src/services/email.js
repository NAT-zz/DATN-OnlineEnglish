import { CONFIG } from '../utils/Constants.js';
import {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from './emailTemplate.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'olivertuan1310@gmail.com',
        pass: 'pykwzozcafkwbfhz',
    },
});

export const sendPasswordResetEmail = async (req, email, token) => {
    try {
        const mailOptions = {
            from: 'no-reply@example.com',
            to: email,
            subject: 'Password reset',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                '{resetURL}',
                `${CONFIG.DOMAIN_CLIENT}/reset-password/${token}`,
            ),
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

export const sendVerificationEmail = async (req, newUser, token) => {
    try {
        const mailOptions = {
            from: 'no-reply@gmail.com',
            to: newUser.email,
            subject: 'Verify Your Email Address',
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                '{verificationLink}',
                `\nhttp://${req.headers.host}/api/user/verify-email/${newUser.email}/${token.token}`,
            ),
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};
