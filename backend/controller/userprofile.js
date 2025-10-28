const User = require("../model/user");
exports.userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// GET a user's favorites
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            favorites: user.favorites,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ADD a recipe to favorites
exports.addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { favorites: recipeId } }, 
            { new: true }
        ).populate('favorites');

        res.status(200).json({
            success: true,
            favorites: user.favorites,
            message: "Recipe added to favorites",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// REMOVE a recipe from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { favorites: recipeId } }, 
            { new: true }
        ).populate('favorites');

        res.status(200).json({
            success: true,
            favorites: user.favorites,
            message: "Recipe removed from favorites",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};