// src/App.jsx - (Update this file)

import React, { useState, useEffect } from 'react';
// ADD useNavigate and useLocation here if not already present
import { Outlet, createBrowserRouter, RouterProvider, useNavigate, useLocation } from "react-router-dom"; 
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

// Components
import MainNavigation from './components/mainNavigations';
import Footer from './components/Footer';
import Model from './components/Model';
import InputForm from './components/InputForm';
import ContactForm from './components/ContactForm';

// Pages
import Home from './pages/home';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';
import AboutPage from './pages/AboutPage';
import RecipesPage from './pages/RecipesPage';
import CategoriesPage from './pages/CategoriesPage';

// --- Data Loaders ---
const getAllRecipes = async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    try {
        const res = await axios.get('http://localhost:5000/api/users/getrecipes', {
            params: { category: category }
        });
        return res.data.data || res.data || [];
    } catch (error) {
        console.error("Error fetching all recipes:", error);
        return [];
    }
};

const getMyRecipes = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const allRecipes = await getAllRecipes({ request: { url: 'http://localhost:5173/myRecipe' } });

        return allRecipes.filter(item => item.createdBy?._id === user?._id);

    } catch (error) {
        console.error("Error fetching my recipes:", error);
        return [];
    }
};
const getFavRecipes = () => {
    try {
        const favs = JSON.parse(localStorage.getItem("fav"));
        return Array.isArray(favs) ? favs : [];
    } catch (error) {
        console.error("Error fetching fav recipes:", error);
        return [];
    }
};

const getRecipe = async ({ params }) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/users/getrecipe/${params.id}`);
        const recipe = res.data.data || res.data;
        
        const recipeWithUsername = { ...recipe, username: recipe.createdBy?.username || 'Anonymous Chef' };
        
        return recipeWithUsername;
    } catch (error) {
        console.error("Error fetching recipe for details page:", error);
        return { 
            title: 'Error Loading Recipe', 
            instructions: 'Could not load recipe details.', 
            ingredients: [], 
            category: [], 
            time: 'N/A', 
            coverImage: null, 
            username: 'Error' 
        };
    }
};
const getCategories = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/users/categories');
        return res.data.data || res.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

const getRecipesAndCategories = async (loaderRequest) => {
    const [recipes, categories] = await Promise.all([
        getAllRecipes(loaderRequest),
        getCategories() 
    ]);
    return { recipes, categories };
};


// --- Root Layout Component ---
function RootLayout() {
    const [modalOpen, setModalOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    // ADD THESE LINES: Import and use useNavigate and useLocation
    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLoginSuccess = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        setModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        // Optional: Redirect if on certain pages after logout
        if (location.pathname === '/myRecipe' || location.pathname === '/favrecipes') {
            navigate('/', { replace: true }); 
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <MainNavigation user={user} setModalOpen={setModalOpen} handleLogout={handleLogout} />
            <main>
                {/* ADD THIS KEY TO THE OUTLET */}
                <Outlet key={location.pathname + location.search} /> 
            </main>
            <Footer setContactModalOpen={setContactModalOpen} />
            
            {modalOpen && (
                <Model onClose={() => setModalOpen(false)}>
                    <InputForm onLoginSuccess={handleLoginSuccess} />
                </Model>
            )}

            {contactModalOpen && (
                <Model onClose={() => setContactModalOpen(false)}>
                    <ContactForm setOpen={setContactModalOpen} />
                </Model>
            )}
        </>
    );
}


// --- App Component ---
export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/recipes", element: <RecipesPage />, loader: getRecipesAndCategories },
                { path: "/myRecipe", element: <RecipesPage />, loader: getMyRecipes },
                { path: "/favrecipes", element: <RecipesPage />, loader: getFavRecipes },
                { path: "/addrecipes", element: <AddFoodRecipe /> },
                { path: "/editRecipe/:id", element: <EditRecipe /> },
                { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
                { path: "/about", element: <AboutPage /> },
                { path: "/categories", element: <CategoriesPage />, loader: getCategories },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}