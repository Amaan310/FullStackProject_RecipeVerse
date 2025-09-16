const Recipes = require("../model/recipe");
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, path.join(__dirname, '../public/images')); 
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + path.parse(file.originalname).name + path.parse(file.originalname).ext;
        cb(null, filename);
    }
});
 
const updateUpload = multer({ storage: storage });

const editRecipe = async(req, res) => {
    let uploadedFilePath = req.file ? req.file.path : null; 

    try {
        let { title, category, ingredients, instructions, time } = req.body; 

        const recipeToUpdate = await Recipes.findById(req.params.id);
        if (!recipeToUpdate) {

            if (uploadedFilePath) {
                fs.unlinkSync(uploadedFilePath);
            }
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (!title || !category || !ingredients || !instructions || !time) {
            if (uploadedFilePath) {
                fs.unlinkSync(uploadedFilePath);
            }
            return res.status(400).json({ message: "Title, category, ingredients, instructions, and cooking time are required." });
        }

        const parsedCategory = category.split(',').map(tag => tag.trim()).filter(Boolean);
        const parsedIngredients = ingredients.split(',').map(ing => ing.trim()).filter(Boolean);

        let parsedTime;
        if (typeof time === 'string') {
            const timeMatch = time.match(/(\d+)(-(\d+))?/); 
            if (timeMatch && timeMatch[1]) {

                parsedTime = parseInt(timeMatch[1], 10);
            }
        } else if (typeof time === 'number') {
            parsedTime = time;
        }

        if (isNaN(parsedTime) || parsedTime <= 0) { 
            if (uploadedFilePath) {
                fs.unlinkSync(uploadedFilePath);
            }
            return res.status(400).json({ message: "Cooking time must be a valid positive number." });
        }

        const updateData = {
            title: title,
            instructions: instructions,
            category: parsedCategory, 
            ingredients: parsedIngredients,
            time: parsedTime, 
        };
        
        if (req.file) {
            if (recipeToUpdate.coverImage && recipeToUpdate.coverImage !== req.file.filename) {
                const oldImagePath = path.join(__dirname, '../public/images', recipeToUpdate.coverImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.coverImage = req.file.filename;
        }

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true } 
        );

        res.status(200).json({
            success: true,
            data: updatedRecipe,
            message: "Recipe updated successfully"
        });

    } catch(err) {
        if (uploadedFilePath) { 
            fs.unlinkSync(uploadedFilePath);
        }
        console.error("Update Recipe Error:", err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { editRecipe, updateUpload };