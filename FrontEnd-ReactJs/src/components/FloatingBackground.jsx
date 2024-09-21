import LogInPage from '../pages/LogInPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import FloatingShape from './FloatingShape';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import DashboardPage from '../pages/DashboardPage';

import { Toaster } from 'react-hot-toast';
import ResetPasswordPage from '../pages/ResetPassordPage';

const FloatingBackground = ({ comp }) => {
    const renderComponent = () => {
        switch (comp) {
            case 'login':
                return <LogInPage />;
            case 'signup':
                return <SignUpPage />;
            case 'forgot':
                return <ForgotPasswordPage />;
            case 'verify':
                return <EmailVerificationPage />;
            case 'dashboard':
                return <DashboardPage />;
            case 'reset':
                return <ResetPasswordPage />;
            default:
                return null;
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br 
        from-gray-900 via-green-900 to-emerald-900 
        flex items-center justify-center relative overflow-hidden"
        >
            <FloatingShape
                color="bg-green-500"
                size="w-64 h-64"
                top="-5%"
                left="10%"
                deday={0}
            ></FloatingShape>
            <FloatingShape
                color="bg-emerald-500"
                size="w-48 h-48"
                top="70%"
                left="80%"
                deday={5}
            ></FloatingShape>
            <FloatingShape
                color="bg-lime-500"
                size="w-32 h-32"
                top="40%"
                left="-10%"
                deday={2}
            ></FloatingShape>

            {renderComponent()}
            <Toaster />
        </div>
    );
};

export default FloatingBackground;
