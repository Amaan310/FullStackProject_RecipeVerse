/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
                localStorage.removeItem('user'); 
                localStorage.removeItem('token');
            }
        }
    }, []);

    const handleLoginSuccess = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        setModalOpen(false); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        const protectedPaths = ['/myRecipe', '/favrecipes', '/addrecipes', '/editRecipe'];
        if (protectedPaths.some(path => location.pathname.startsWith(path))) {
            navigate('/', { replace: true });
        }
        setModalOpen(false); 
        toast.success("Logged out successfully!");
    };
    const authContextValue = {
        user,
        setUser,
        modalOpen,
        setModalOpen,
        handleLoginSuccess,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};