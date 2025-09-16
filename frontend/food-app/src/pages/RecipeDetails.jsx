import React, { useState } from 'react'
import '../assets/react.svg'
import { useLoaderData } from 'react-router-dom'
import { BsStopwatch, BsPerson, BsImage, BsHeart, BsBookmark, BsShare } from 'react-icons/bs'
import LatestRecipes from '../components/LatestRecipes'

export default function RecipeDetails() {
  const recipe = useLoaderData()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  
  console.log("Recipe details:", recipe)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-3/3 mt-18">
          {/*  Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            
            {/* Header  */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='25' fill='%23ffcccc'/%3E%3Ccircle cx='50' cy='100' r='40' fill='%23ffcccc'/%3E%3C/svg%3E"
                    width="60px" 
                    height="60px" 
                    alt="Profile" 
                    className="rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1">
                    <BsPerson className="text-white text-xs" />
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 capitalize">{recipe?.username || "Unknown User"}</h5>
                  <p className="text-sm text-gray-500">Recipe Creator</p>
                </div>
              </div>
              
 
            </div>

            
            {recipe?.coverImage && (
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-gray-100">
                
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
                    <div className="text-center">
                      <BsImage className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Loading image...</p>
                    </div>
                  </div>
                )}
                
                {/* Error State */}
                {imageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                    <BsImage className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-center mb-2">Image not available</p>
                    <p className="text-gray-400 text-sm text-center">The recipe image could not be loaded</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={`http://localhost:5000/images/${recipe.coverImage}`}
                      alt={recipe?.title || "Recipe"}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </>
                )}
              </div>
            )}

            {/* Fallback if no coverImage */}
            {!recipe?.coverImage && (
              <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <BsImage className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">No Image Available</h3>
                  <p className="text-amber-600">Visualize your delicious {recipe?.title || "recipe"}!</p>
                </div>
              </div>
            )}

            {/* Recipe Title and Time */}
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0 text-center sm:text-left">{recipe?.title || "No Title"}</h1>
                {recipe?.time && (
                  <div className="flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full mt-4 sm:mt-0 justify-center sm:justify-start">
                    <BsStopwatch className="mr-2" />
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                )}
              </div>

              {/* Ingredients and Instructions */}
              <div className="grid md:grid-cols-2 gap-8">
               
                <div className="bg-rose-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-5 bg-rose-500 rounded-full mr-3"></span>
                    Ingredients
                    <span className="ml-2 text-sm text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                      {Array.isArray(recipe?.ingredients) ? recipe.ingredients.length : 0} items
                    </span>
                  </h4>
                  {Array.isArray(recipe?.ingredients) && recipe.ingredients.length > 0 ? (
                    <ul className="space-y-3">
                      {recipe.ingredients.map((item, idx) => (
                        <li key={idx} className="flex items-start transition-transform hover:translate-x-1">
                          <span className="text-rose-500 mr-3 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No ingredients available</p>
                  )}
                </div>

              
                <div className="bg-amber-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-5 bg-amber-500 rounded-full mr-3"></span>
                    Instructions
                  </h4>
                  <div className="prose prose-amber max-w-none">
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {recipe?.instructions || "No instructions provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Enjoy your meal! 🍽️
              </p>
            </div>
          </div>
        </div>
        
        {/*  Latest Recipes */}
        <div className="w-full lg:w-2/3 mt-10 lg:mt-4">
          <div className="sticky top-26">
            <LatestRecipes />
          </div>
        </div>
      </div>
    </div>
  )
}