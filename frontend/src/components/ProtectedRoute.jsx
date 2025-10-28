import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProtectedRoute() { 
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const handleAuthChange = () => {
            setIsAuth(!!localStorage.getItem('token'));
        };
        
        window.addEventListener('auth-change', handleAuthChange);
        setIsChecking(false); 

        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    useEffect(() => {
        if (!isChecking && !isAuth) {
            toast.error("Please log in to access this page.", { id: 'login-required', duration: 3000 });
            navigate('/');
            window.dispatchEvent(new CustomEvent('open-login-modal', { detail: true }));
        }
    }, [isAuth, isChecking, navigate]);

    if (isChecking) {
        return null;
    }

    return isAuth ? <Outlet /> : null;
}