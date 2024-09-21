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
export const sendPasswordResetEmail = async (email, token) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            to: recipient,
            from: sender,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                '{resetURL}',
                `${process.env.CLIENT_URL}/reset-password/${token}`,
            ),
            category: 'Password Reset',
        });
        return {
            success: true,
            message: 'Reset password email sent successfully',
        };
    } catch (err) {
        console.error('Error sending email', err);
        return {
            success: false,
            message: 'Failed to send reset password email',
        };
    }
};

export const sendPasswordResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            to: recipient,
            from: sender,
            subject: 'Password reseted',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset Success',
        });
        return {
            success: true,
            message: 'Password reset successfully email sent',
        };
    } catch (err) {
        console.error('Error sending email', err);
        return {
            success: false,
            message: 'Failed to send password reset successfully email',
        };
    }
};

export const sendVerificationEmail = async (req, newUser, token) => {
    // const recipient = [{ email }];

    // try {
    //     const response = await mailtrapClient.send({
    //         to: recipient,
    //         from: sender,
    //         subject: 'Verify your email address',
    //         html: VERIFICATION_EMAIL_TEMPLATE.replace(
    //             '{verificationCode}',
    //             token,
    //         ),
    //         category: 'Email Verification',
    //     });
    //     return {
    //         success: true,
    //         message: 'Verification email sent successfully',
    //     };
    // } catch (err) {
    //     console.error('Error sending email', err);
    //     return { success: false, message: 'Failed to send verification email' };
    // }

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
        transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email', error);
        throw error;
    }
};

export const sendWelcomeEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '1aab1985-3dfa-43bc-aa2c-02f1edb36322',
            template_variables: {
                company_info_name: 'Test_Company_info_name',
                name: 'Test_Name',
            },
        });

        console.log('Welcome email sent ', response);
    } catch (error) {
        console.error('Error sending welcome email ', error);
    }
};
