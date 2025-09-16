const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category: {
        type: [String],
        required: true
    },
    ingredients:{
        type:[String],
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    time:{
        type:Number, 
        required: true 
    },
    coverImage:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true 
    }
},{timestamps:true})

module.exports = mongoose.model('Recipes', recipeSchema);