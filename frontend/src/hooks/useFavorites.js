import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast'; 

const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavs = localStorage.getItem('fav');
            return storedFavs ? JSON.parse(storedFavs) : [];
        } catch (error) {
            console.error("Failed to parse favorites from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('fav', JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites to localStorage", error);
        }
    }, [favorites]);

    const isFavorite = useCallback((recipeId) => {
        return favorites.some(favRecipe => favRecipe._id === recipeId);
    }, [favorites]);

    const toggleFavorite = useCallback((recipe) => {
        setFavorites(prevFavorites => {
            const alreadyFavorite = prevFavorites.some(favRecipe => favRecipe._id === recipe._id);
            const toastId = `fav-toggle-${recipe._id}`; 

            if (alreadyFavorite) {
                toast.success(`${recipe.title} removed from favorites!`, { id: toastId });
                return prevFavorites.filter(favRecipe => favRecipe._id !== recipe._id);
            } else {
                toast.success(`${recipe.title} added to favorites!`, { id: toastId });
                return [...prevFavorites, recipe];
            }
        });
    }, []); 

    return { favorites, isFavorite, toggleFavorite };
};

export default useFavorites;