import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProtectedRoute({ user, setModalOpen }) { 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { 
            toast.error("Please log in to access this page.", { id: 'login-required', duration: 3000 });
            navigate('/');
            setModalOpen(true); 
        }
    }, [user, navigate, setModalOpen]); 

    return user ? <Outlet /> : null; 
}