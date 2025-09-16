import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const heroBackgroundStyle = {
        backgroundImage: 'url("/images/food_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="relative overflow-hidden min-h-screen flex items-center justify-center" style={heroBackgroundStyle}>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 text-center">
                <div className="lg:max-w-2xl mx-auto p-8"
                     style={{
                         backgroundColor: 'rgba(25, 25, 25, 0.25)',
                         backdropFilter: 'blur(10px) saturate(150%)',
                         WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                         border: '1px solid rgba(255, 255, 255, 0.18)',
                         borderRadius: '15px'
                     }}>
                    
                    <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl text-white">
                        <span className="block">Discover Delicious Recipes</span>
                        <span className="block text-red-400">From Around The World</span>
                    </h1>

                    <p className="mt-4 text-base sm:mt-6 sm:text-lg sm:max-w-xl mx-auto md:text-xl text-gray-200">
                        Explore new cuisines, try different cooking techniques, and find inspiration for your next meal.
                    </p>

                    <div className="mt-8 sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => navigate('/addrecipes')}
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                        >
                            Share Your Recipe
                        </button>
                        <button
                            onClick={() => navigate('/recipes')}
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-red-400 text-base font-medium rounded-md text-red-400 bg-transparent hover:bg-red-400 hover:text-white md:py-4 md:text-lg md:px-10"
                        >
                            Explore Recipes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}