import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { FiHeart } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { getTagStyle } from '../utils/tagStyles.jsx';

export default function RecipeItems({ item, onDelete, onFavToggle, isFavorite }) {
    console.log(`Recipe: ${item.title}, Time: ${item.time}, Type of Time: ${typeof item.time}`);

    const navigate = useNavigate();
    const location = useLocation(); 
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    const isOwner = user && item.createdBy && user._id === item.createdBy._id;
    const showAdminControls = isOwner && location.pathname === '/myRecipe';

    let categoriesToDisplay = [];
    if (Array.isArray(item.category)) {
        categoriesToDisplay = item.category.flatMap(cat => cat.split(',').map(c => c.trim()));
    } else if (typeof item.category === 'string') {
        categoriesToDisplay = item.category.split(',').map(c => c.trim());
    }
    categoriesToDisplay = categoriesToDisplay.filter(cat => cat);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
            <div 
                className="relative h-48 w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/recipe/${item._id}`)}
            >
                <img
                    src={item.coverImage ? `${import.meta.env.VITE_API_URL}/images/${item.coverImage}` : 'https://via.placeholder.com/400x250.png?text=No+Image+Available'}
                    alt={item.title || "Recipe"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent"></div>
                {user && !showAdminControls && (
                    <div className="absolute top-2 right-2">
                        <button
                            className={`p-2 rounded-full transition-colors duration-200 backdrop-blur-sm bg-white/80 ${
                                isFavorite ? "text-red-500" : "text-gray-600"
                            }`}
                            onClick={(e) => { e.stopPropagation(); onFavToggle(item); }}
                            aria-label="Toggle favorite"
                        >
                            {isFavorite ? <FaHeart className="w-5 h-5" /> : <FiHeart className="w-5 h-5" />}
                        </button>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {categoriesToDisplay.map(tag => {
                        const style = getTagStyle(tag);
                        return (
                            <span key={tag} className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${style.color}`}>
                                {style.icon}
                                {tag}
                            </span>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                        <BsStopwatchFill className="text-red-500 mr-1" />
                        <span>
                            {(() => {
                                if (typeof item.time === 'number') {
                                    return `${item.time} min`;
                                }
                                if (typeof item.time === 'string') {
                                    if (item.time.includes('-')) {
                                        return item.time.replace(/minutes?/, '').trim() + ' min';
                                    }
                                    const numMatch = item.time.match(/\d+/);
                                    if (numMatch && numMatch[0]) {
                                        return `${numMatch[0]} min`;
                                    }
                                    return item.time;
                                }
                                return 'N/A';
                            })()}
                        </span>
                    </div>

                    {showAdminControls && (
                        <div className="flex space-x-1">
                            <Link
                                to={`/editRecipe/${item._id}`}
                                className="p-2 rounded-full text-blue-500 hover:bg-blue-50"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaEdit className="w-4 h-4" />
                            </Link>
                            <button
                                className="p-2 rounded-full text-red-500 hover:bg-red-50"
                                onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
                            >
                                <MdDelete className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );  
}