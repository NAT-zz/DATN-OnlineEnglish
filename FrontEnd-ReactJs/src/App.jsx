import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import FloatingBackground from './components/FloatingBackground';
import { useAuthStore } from './store/AuthStore';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

//protect routes that require authentication
const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

//redirect authenticated users to homepage
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated) return <Navigate to="/" replace />;
    return children;
};

function App() {
    const { isCheckingAuth, checkAuth } = useAuthStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    if (isCheckingAuth) return <LoadingSpinner />;

    return (
        <Box minH={'100vh'} bg={useColorModeValue('gray.100', 'gray.900')}>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <HomePage />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoutes>
                            <CreatePage />{' '}
                        </ProtectedRoutes>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <RedirectAuthenticatedUser>
                            <FloatingBackground comp={'signup'} />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoutes>
                            <FloatingBackground comp={'dashboard'} />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticatedUser>
                            <FloatingBackground comp={'login'} />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={<FloatingBackground comp={'forgot'} />}
                />
                <Route
                    path="/verify-email"
                    element={<FloatingBackground comp={'verify'} />}
                />
                <Route
                    path="/forgot-password"
                    element={
                        <RedirectAuthenticatedUser>
                            <FloatingBackground comp={'forgot'} />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/reset-password/:token"
                    element={
                        <RedirectAuthenticatedUser>
                            <FloatingBackground comp={'reset'} />
                        </RedirectAuthenticatedUser>
                    }
                />
            </Routes>
        </Box>
    );
}

export default App;
