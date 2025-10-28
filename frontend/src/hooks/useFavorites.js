import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api'; 

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Step 1: Fetch the user's favorites from the database when the app loads
    useEffect(() => {
        const fetchFavorites = async () => {
            // Only fetch if the user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                setFavorites([]); // Clear favorites if user logs out
                return;
            }

            try {
                const response = await api.get('/api/users/favorites');
                if (response.data.success) {
                    setFavorites(response.data.favorites);
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
                // Don't show a toast for a background fetch failure
            }
        };

        fetchFavorites();

        // Optional: Add an event listener to refetch when user logs in/out
        const handleAuthChange = () => fetchFavorites();
        window.addEventListener('auth-change', handleAuthChange);
        return () => {
            window.removeEventListener('auth-change', handleAuthChange);
        };
    }, []);

    // Step 2: Check if a recipe is in the favorites list (this logic is similar)
    const isFavorite = useCallback((recipeId) => {
        return favorites.some(favRecipe => favRecipe._id === recipeId);
    }, [favorites]);

    // Step 3: Add or remove a favorite by calling the backend API
    const toggleFavorite = useCallback(async (recipe) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to save favorites!");
            return;
        }

        const alreadyFavorite = isFavorite(recipe._id);
        const endpoint = alreadyFavorite ? '/api/users/favorites/remove' : '/api/users/favorites/add';
        const toastId = `fav-toggle-${recipe._id}`;

        try {
            const response = await api.post(endpoint, { recipeId: recipe._id });
            if (response.data.success) {
                setFavorites(response.data.favorites); 
                if (alreadyFavorite) {
                    toast.success(`${recipe.title} removed from favorites!`, { id: toastId });
                } else {
                    toast.success(`${recipe.title} added to favorites!`, { id: toastId });
                }
            }
        } catch (error) {
            console.error("Failed to update favorites:", error);
            toast.error("Could not update favorites. Please try again.", { id: toastId });
        }
    }, [isFavorite]);

    return { favorites, isFavorite, toggleFavorite };
};

export default useFavorites;