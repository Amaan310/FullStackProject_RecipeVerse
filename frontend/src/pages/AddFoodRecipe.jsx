import React, { useState } from 'react';
import api from '../utils/api'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

export default function AddFoodRecipe() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData();
        
        const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);
        const categoryArray = category.split(',').map(item => item.trim()).filter(item => item);
        
        formData.append('ingredients', JSON.stringify(ingredientsArray));
        formData.append('category', JSON.stringify(categoryArray)); 

        formData.append('title', title);
        formData.append('time', time); 
        formData.append('instructions', instructions);
        
        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to add a recipe.');
                toast.error('You must be logged in to add a recipe.'); 
                setIsLoading(false);
                return;
            }

            await api.post('/api/users/createrecipe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success('Recipe added successfully!');
            setTimeout(() => {
                navigate('/myRecipe'); 
            }, 1500); 

        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to add recipe. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage); 
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Recipe</h2>
                <form onSubmit={handleOnSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category <span className="text-gray-500 text-xs">(separate each with a comma)</span></label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="e.g., Main Course, North Indian, Vegetarian"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Cooking Time (in minutes)</label>
                        <input
                            id="time"
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="e.g., 40"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients <span className="text-gray-500 text-xs">(separate each with a comma)</span></label>
                        <textarea
                            id="ingredients"
                            rows="4"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions <span className="text-gray-500 text-xs">(one step per line)</span></label>
                        <textarea
                            id="instructions"
                            rows="6"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Step 1..."
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Recipe Image</label>
                        <input
                            id="coverImage"
                            type="file"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                            required
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

                    <div className="flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                        >
                            {isLoading ? 'Adding...' : 'Add Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}