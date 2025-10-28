import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import RecipeItems from '../components/RecipeItems';
import useFavorites from '../hooks/useFavorites';
import { FaSearch, FaPlus, FaHeart } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Home() {
    const navigate = useNavigate();
    const [latestRecipes, setLatestRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            try {
                const res = await api.get('/api/users/getrecipes');
                const recent = res.data.data.slice(-3).reverse();
                setLatestRecipes(recent);
            } catch (error) {
                console.error("Failed to fetch latest recipes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestRecipes();
    }, []);

    const heroBackgroundStyle = {
        backgroundImage: 'url("/images/food_background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="bg-gray-50">
            {/* Section 1: Hero Banner */}
            <div className="relative overflow-hidden h-screen flex items-center justify-center" style={heroBackgroundStyle}>
                <div className="absolute inset-0 bg-black/50"></div>
                <motion.div 
                    className="relative z-10 text-center max-w-4xl mx-auto px-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="mx-auto p-8 sm:p-12" style={{
                        backgroundColor: 'rgba(25, 25, 25, 0.25)',
                        backdropFilter: 'blur(10px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(10px) saturate(150%)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '20px'
                    }}>
                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
                            <span className="block">Cook, Share, and</span>
                            <span className="block text-red-400">Discover</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-gray-200">
                           Join our community of home cooks to find and share your next favorite meal. Your ultimate personal cookbook awaits.
                        </motion.p>
                        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/recipes')}
                                className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-lg text-white bg-red-600 shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300"
                            >
                                Explore Recipes
                            </button>
                            <button
                                onClick={() => navigate('/addrecipes')}
                                className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-lg text-red-400 bg-transparent border-2 border-red-400 hover:bg-red-400 hover:text-white hover:-translate-y-0.5 transform transition-all duration-300"
                            >
                                Share Your Recipe
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Section 2: Latest Recipes */}
            {!isLoading && latestRecipes.length > 0 && (
                <motion.div 
                    className="py-16 sm:py-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* ▼▼▼ FIX #1: TITLE IS CENTERED AGAIN ▼▼▼ */}
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Fresh from the Kitchen
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Check out the latest delicious recipes shared by our community.
                            </p>
                        </div>
                        <motion.div 
                            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                            variants={containerVariants}
                        >
                            {latestRecipes.map((recipe) => (
                                <motion.div key={recipe._id} variants={itemVariants}>
                                    <RecipeItems
                                        item={recipe}
                                        isFavorite={isFavorite(recipe._id)}
                                        onFavToggle={toggleFavorite}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                        {/* ▼▼▼ FIX #2: BUTTON IS CENTERED BELOW THE CARDS ▼▼▼ */}
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => navigate('/recipes')}
                                className="px-8 py-3 text-lg font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg"
                            >
                                View All Recipes
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Section 3: How It Works */}
            <motion.div 
                className="bg-white py-16 sm:py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            How FoodVerse Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            A simple process to your culinary journey.
                        </p>
                    </div>
                    {/* ▼▼▼ FIX #3: CONTAINER NOW STAGGERS CHILDREN CARDS ▼▼▼ */}
                    <motion.div 
                        className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 text-center"
                        variants={containerVariants}
                    >
                        {/* Each step is now a motion.div to animate individually */}
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                                <FaSearch className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Discover Recipes</h3>
                            <p className="mt-2 text-gray-600">
                                Search thousands of community-tested recipes for any occasion.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                                <FaPlus className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Create & Share</h3>
                            <p className="mt-2 text-gray-600">
                                Add your own creations and share your culinary passion with the world.
                            </p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4">
                                <FaHeart className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Save Favorites</h3>
                            <p className="mt-2 text-gray-600">
                                Build your personal cookbook by saving the recipes you love.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}