// backend/controller/getrecipe.js

const Recipe = require("../model/recipe");

// This function now correctly filters recipes based on the category from the URL
exports.getRecipes = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {}; // Start with an empty filter

        // If a category is provided in the URL, build the filter object
        if (category && category !== 'All') {
            filter = { category: category }; // Mongoose can find if a string is in an array
        }

        // Use the filter object in the find() method
        const recipes = await Recipe.find(filter).populate('createdBy', 'username email');

        res.status(200).json({
            success: true,
            data: recipes,
            message: "Recipe data fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// This function remains the same, for fetching a single recipe
exports.getRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findById(id).populate('createdBy', 'username email'); // Added populate for consistency

        if (!recipe) {
            return res.status(404).json({ // Use 404 for "Not Found"
                success: false,
                message: "No data found with the given ID",
            });
        }
        res.status(200).json({
            success: true,
            data: recipe,
            message: `Recipe ${id} data successfully fetched`,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getUniqueCategories = async (req, res) => {
    try {
        const categories = await Recipe.distinct('category');
        // Flatten the array in case some categories are arrays of arrays, then get unique values
        const uniqueCategories = Array.from(new Set(categories.flat())).filter(c => c);

        res.status(200).json({
            success: true,
            data: uniqueCategories, 
            message: "Unique categories fetched successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};