// src/components/mainNavigations.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MainNavigation({ user, setModalOpen, handleLogout }) {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <header className="bg-red-600 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        {/* --- CHANGE THIS BLOCK --- */}
                        <NavLink to="/" className="flex items-center space-x-2"> {/* Added flex and items-center for alignment */}
                            {/* Assuming your logo is named foodverse_logo.png and is in public/images */}
                            <img src="/images/foodverse_logo.png" alt="FoodVerse Logo" className="h-15" /> {/* Adjust height as needed */}
                            {/* If you still want the text next to the logo, uncomment the span below */}
                            {/* <span className="text-2xl font-bold text-white">FoodVerse</span> */}
                        </NavLink>
                        {/* ------------------------- */}
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `hover:text-white transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-red-200"}`}
                        >
                            Home
                        </NavLink>
                        {user && (
                            <>
                                <NavLink 
                                    to="/myRecipe" 
                                    className={({ isActive }) => `hover:text-white transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-red-200"}`}
                                >
                                    My Recipes
                                </NavLink>
                                <NavLink 
                                    to="/favrecipes" 
                                    className={({ isActive }) => `hover:text-white transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-red-200"}`}
                                >
                                    Favorites
                                </NavLink>
                            </>
                        )}
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => `hover:text-white transition-colors duration-200 ${isActive ? "text-white font-semibold" : "text-red-200"}`}
                        >
                            About
                        </NavLink>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <button
                                onClick={onLogout}
                                className="ml-4 px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-red-100"
                            >
                                Logout ({user.email})
                            </button>
                        ) : (
                            <button 
                                onClick={() => setModalOpen(true)}
                                className="ml-4 px-4 py-2 bg-white text-red-600 rounded-md text-sm font-medium hover:bg-red-100"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}