import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { BsStopwatch, BsPerson } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; // Import the animation library

export default function RecipeDetails() {
  const recipe = useLoaderData();

  // Animation variants for staggering children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    // We wrap the entire page in a motion component to animate its entry
    <motion.div 
        className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* ▼▼▼ NEW TWO-COLUMN LAYOUT STARTS HERE ▼▼▼ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* --- LEFT COLUMN: STICKY IMAGE --- */}
          <motion.div className="lg:col-span-2 lg:sticky lg:top-24 h-max" variants={imageVariants}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden aspect-w-1 aspect-h-1">
              <img
                src={recipe.coverImage ? `${import.meta.env.VITE_API_URL}/images/${recipe.coverImage}` : 'https://via.placeholder.com/600x600.png?text=Image+Not+Found'}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: RECIPE DETAILS --- */}
          <motion.div className="lg:col-span-3" variants={containerVariants}>
            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{recipe.title}</motion.h1>

            {/* Author & Time Info */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-gray-600">
              <div className="flex items-center">
                <BsPerson className="mr-2 text-red-500" />
                <span>By {recipe.username || 'Anonymous Chef'}</span>
              </div>
              <div className="flex items-center">
                <BsStopwatch className="mr-2 text-red-500" />
                <span>{recipe.time} min</span>
              </div>
            </motion.div>

            {/* Ingredients Section */}
            <motion.div variants={itemVariants} className="bg-rose-50/50 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
              <motion.ul variants={containerVariants} className="space-y-3">
                {recipe.ingredients.map((item, idx) => (
                  <motion.li key={idx} variants={itemVariants} className="flex items-start">
                    <span className="text-red-500 font-bold mr-3 mt-1">&#8226;</span>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Instructions Section */}
            <motion.div variants={itemVariants} className="bg-amber-50/50 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <motion.div variants={containerVariants} className="space-y-4">
                {recipe.instructions.split('\n').map((step, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white font-bold mr-4">{idx + 1}</div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}