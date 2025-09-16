import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsStopwatchFill } from "react-icons/bs"; // Added this icon for consistency

export default function LatestRecipes() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/getrecipes");
                
                // Assuming res.data.data is an array directly containing recipes
                // Each recipe should now have a populated 'createdBy' object with 'username'
                const recipesData = res.data.data || []; 

                if (Array.isArray(recipesData)) {
                    // No need for separate user profile fetches!
                    // The 'createdBy' field should already be populated by the backend.
                    setAllRecipes(recipesData);
                } else {
                    console.error("Fetched data is not an array:", recipesData);
                    setAllRecipes([]);
                }

            } catch (err) {
                console.error("Error fetching recipes for LatestRecipes:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading recipes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-4 px-4 sm:px-6 lg:px-4 font-sans rounded-2xl">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-5">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                        Other Recipes
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-5">
                        Discover delicious recipes created by our community of food enthusiasts
                    </p>
                </div>

                <div className="relative mb-5">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 bg-gray-50 text-sm text-gray-500">Latest additions</span>
                    </div>
                </div>

                {allRecipes.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-2xl font-medium text-gray-700 mb-3">
                                No recipes yet
                            </h3>
                            <p className="text-gray-500 mb-6">Be the first to share your culinary masterpiece!</p>
                            <button
                                onClick={() => navigate("/add-recipe")}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                            >
                                Create Your First Recipe
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* We'll display only the first 5-10 items as "latest additions" */}
                        {allRecipes.slice(0, 5).map((item) => ( // Limiting to top 5 for "Latest Additions"
                            <div key={item._id} onClick={() => navigate(`/recipe/${item._id}`)} className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                                <div className="flex">
                                    <div className="p-2 flex-shrink-0">
                                        {item.coverImage ? (
                                            <img
                                                src={`http://localhost:5000/images/${item.coverImage}`}
                                                alt={item.title}
                                                className="w-28 h-20 object-cover rounded-md" // Adjusted height
                                                onError={(e) => {
                                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-28 h-20 bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center rounded-md">
                                                <div className="text-2xl">🍳</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 p-2 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                                                {item.title || "Untitled Recipe"}
                                            </h3>

                                            {/* Instructions are often too long for this sidebar, let's just show author and time */}
                                            {/* <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                                                {item.instructions?.substring(0, 120) || "No description available..."}
                                                {item.instructions && item.instructions.length > 120 ? "..." : ""}
                                            </p> */}
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2"> {/* Adjusted margin */}
                                                    <span className="text-white text-xs font-medium">
                                                        {/* --- THE FIX IS HERE --- */}
                                                        {item.createdBy?.username ? item.createdBy.username.charAt(0).toUpperCase() : "A"}
                                                        {/* ----------------------- */}
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    <p className="text-gray-900 leading-none capitalize">
                                                        {/* --- THE FIX IS HERE --- */}
                                                        {item.createdBy?.username || "Anonymous Chef"}
                                                        {/* ----------------------- */}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {item.time && (
                                                <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full ml-auto"> {/* Added ml-auto to push to right */}
                                                    <BsStopwatchFill className="text-red-500 mr-1" /> {/* Using BsStopwatchFill */}
                                                    <span className="font-medium">{item.time}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}