/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../utils/api"; 
import { useParams, useNavigate } from "react-router-dom";

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [time, setTime] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const res = await api.get(`/api/users/getrecipe/${id}`);
                const data = res.data.data;
                setTitle(data.title || '');
                setCategory(Array.isArray(data.category) ? data.category.join(', ') : '');
                setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join(', ') : '');
                setInstructions(data.instructions || '');
                setTime(data.time || '');
                setExistingImage(data.coverImage || '');
            } catch (error) {
                setError("Failed to load recipe data.");
            }
        };
        fetchRecipeData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication error. Please log in again.');
            setIsLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("time", time);
            formData.append("instructions", instructions);
            formData.append("ingredients", ingredients);
            
            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            await api.put(
                `/api/users/updaterecipe/${id}`,
                formData,
                { 
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    } 
                }
            );
            navigate("/myRecipe");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update recipe.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Edit Your Recipe</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-gray-500 text-sm">(comma separated)</span></label>
                            <input
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Cooking Time</label>
                            <input
                                id="time"
                                type="text"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">Ingredients <span className="text-gray-500 text-sm">(comma separated)</span></label>
                            <textarea
                                id="ingredients"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                rows="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                            {existingImage && !coverImage && (
                                <div className="my-2">
                                    <img src={`${import.meta.env.VITE_API_URL}/images/${existingImage}`} alt="Current recipe" className="w-48 h-32 object-cover rounded-lg shadow-md" />
                                </div>
                            )}
                            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mt-2">{existingImage ? "Change image (Optional):" : "Upload image:"}</label>
                            <input
                                id="coverImage"
                                type="file"
                                onChange={(e) => setCoverImage(e.target.files[0])}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0"
                            />
                        </div>

                        {error && <p className="text-sm text-red-600 p-3 bg-red-50 rounded-md">{error}</p>}
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button type="button" onClick={() => navigate(-1)} className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium">Cancel</button>
                            <button type="submit" disabled={isLoading} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md disabled:bg-blue-300">
                                {isLoading ? "Updating..." : "Update Recipe"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}