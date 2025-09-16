const express = require('express');
const route = express.Router();

const { getRecipes, getRecipe, getUniqueCategories } = require('../controller/getrecipe');
const { createRecipe, upload } = require('../controller/createrecipe');
const { editRecipe, updateUpload } = require('../controller/updaterecipe');
const { deleteRecipe } = require('../controller/deleterecipe');
const verifyToken = require('../middleware/auth');

const { userSignup } = require('../controller/usersignup');
const { userLogin } = require('../controller/userlogin');
const { userProfile } = require('../controller/userprofile');

route.get('/getrecipes', getRecipes);
route.get('/getrecipe/:id', getRecipe);
route.post('/createrecipe', upload.single('coverImage'), verifyToken, createRecipe);
route.put('/updaterecipe/:id', updateUpload.single('coverImage'), editRecipe);
route.delete('/deleterecipe/:id', deleteRecipe);

route.get('/categories', getUniqueCategories);

route.post('/signup', userSignup);
route.post('/userlogin', userLogin);
route.get('/userprofile/:id', userProfile);

module.exports = route;