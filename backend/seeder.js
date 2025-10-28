const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./model/recipe');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.DATABASE_URL);

// ▼▼▼ YOUR CORRECT USER ID IS NOW HARDCODED ▼▼▼
const userId = '68f711ed186dffb540d5b261';

// Read JSON files
const recipesData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/recipes.json`, 'utf-8')
);

// ▼▼▼ ADD YOUR USER ID TO EVERY RECIPE ▼▼▼
const recipesWithUser = recipesData.map(recipe => ({
  ...recipe,
  createdBy: userId
}));

// Import into DB
const importData = async () => {
  try {
    // Use the new array that includes your user ID
    await Recipe.create(recipesWithUser);
    console.log('Data Imported and Assigned to User...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Recipe.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}