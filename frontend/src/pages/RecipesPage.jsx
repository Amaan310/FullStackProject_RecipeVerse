import React, { useEffect } from 'react'; 
import { useLoaderData, useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import RecipeItems from '../components/RecipeItems';
import { BsJournalBookmark } from 'react-icons/bs';
import useFavorites from '../hooks/useFavorites';

export default function RecipesPage() {
    const loaderData = useLoaderData();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { isFavorite, toggleFavorite, favorites } = useFavorites(); 

    const isMyRecipesPage = location.pathname === '/myRecipe';
    const isFavRecipesPage = location.pathname === '/favrecipes';
    const isExplorePage = !isMyRecipesPage && !isFavRecipesPage;

    let recipes = [];
    let allCategories = [];

    if (isExplorePage) {
        recipes = loaderData?.recipes || [];
        allCategories = loaderData?.categories || [];
    } else if (isMyRecipesPage) {
        recipes = loaderData || []; 
    } else if (isFavRecipesPage) {

        recipes = favorites;
    }

    const selectedCategory = searchParams.get('category') || 'All';

    const handleCategoryChange = (category) => {
        if (category === 'All') {
            navigate('/recipes');
        } else {
            navigate(`/recipes?category=${encodeURIComponent(category)}`);
        }
    };

    let pageTitle = 'Explore All Recipes';
    let pageSubtitle = 'Discover delicious recipes from around the world.';
    let emptyMessage = 'No recipes found.';

    if (isMyRecipesPage) {
        pageTitle = 'My Created Recipes';
        pageSubtitle = 'Here you can manage, edit, or delete the recipes you have shared.';
        emptyMessage = "You haven't created any recipes yet.";
    } else if (isFavRecipesPage) {
        pageTitle = 'My Favorite Recipes';
        pageSubtitle = 'The recipes you love, all in one place.';
        emptyMessage = "You haven't added any recipes to your favorites yet.";
    }
    useEffect(() => {
        if (isFavRecipesPage) {
            // This is a bit of a hack to force React Router to re-evaluate the loader

        }
    }, [favorites, isFavRecipesPage]);


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-sm font-bold text-red-600 uppercase tracking-wider">{isExplorePage ? 'Delicious Recipes' : ''}</p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{pageTitle}</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{pageSubtitle}</p>
                </div>
                {isExplorePage && allCategories.length > 0 && (
                    <div className="mb-8 flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => handleCategoryChange('All')}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                selectedCategory === 'All'
                                    ? 'bg-red-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            All
                        </button>
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-red-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {recipes.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {recipes.map((recipe) => (
                            <RecipeItems 
                                key={recipe._id} 
                                item={recipe} 
                                isFavorite={isFavorite(recipe._id)} 
                                onFavToggle={toggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <BsJournalBookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700">{emptyMessage}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}