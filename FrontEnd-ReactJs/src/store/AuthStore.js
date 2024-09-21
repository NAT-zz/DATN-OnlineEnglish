import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, username) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
                username,
            });
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.log(error.message);
            set({
                error: error?.response.data.message || 'Error signing up',
                isLoading: false,
            });
            throw error;
        }
    },

    verifyEmail: async (token) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/verify-email`, {
                token,
            });
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
            return response.data;
        } catch (error) {
            console.log(error.response.data.message);
            set({
                error: error.response.data.message || 'Error signing up',
                isLoading: false,
            });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            set({
                error: error.response.data.message || 'Error logging up',
                isLoading: false,
            });
            throw error;
        }
    },

    checkAuth: async () => {
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            console.log("checkAuth: ", response.data.data.user);
            set({
                user: response.data.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            });
        } catch (error) {
            console.log(error.message);
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    // logout: async () => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         await axios.post(`${API_URL}/logout`);
    //         set({
    //             user: null,
    //             isAuthenticated: false,
    //             error: null,
    //             isLoading: false,
    //         });
    //     } catch (error) {
    //         set({ error: 'Error logging out', isLoading: false });
    //         throw error;
    //     }
    // },

    // resetPassword: async (token, password, confirmPassword) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await axios.post(
    //             `${API_URL}/reset-password/${token}`,
    //             { password, repeat: confirmPassword },
    //         );
    //         set({ message: response.data.message, isLoading: false });
    //     } catch (error) {
    //         set({
    //             isLoading: false,
    //             error:
    //                 error.response.data.message || 'Error resetting password',
    //         });
    //         throw error;
    //     }
    // },

    // forgotPassword: async (email) => {
    // 	set({ isLoading: true, error: null });
    // 	try {
    // 		const response = await axios.post(`${API_URL}/forgot-password`, { email });
    // 		set({ message: response.data.message, isLoading: false });
    // 	} catch (error) {
    // 		set({
    // 			isLoading: false,
    // 			error: error.response.data.message || "Error sending reset password email",
    // 		});
    // 		throw error;
    // 	}
    // },
}));
