import React from 'react';
import { FaLeaf, FaBirthdayCake, FaCarrot, FaSeedling } from 'react-icons/fa';
import { GiMeat, GiBowlOfRice } from 'react-icons/gi';
import { IoFastFoodOutline, IoCafe } from 'react-icons/io5';
import { MdDinnerDining, MdFreeBreakfast, MdOutlineTapas } from 'react-icons/md';

export const getTagStyle = (tag) => {
  const normalizedTag = tag.toLowerCase().trim();

  const styles = {
    // ## CORE DIETARY TAGS ##
    'vegetarian': { icon: <FaLeaf className="mr-1 text-green-600" />, color: 'bg-green-100 text-green-800' },
    'non-vegetarian': { icon: <GiMeat className="mr-1 text-red-600" />, color: 'bg-red-100 text-red-800' },
    'vegan': { icon: <FaSeedling className="mr-1 text-green-700" />, color: 'bg-green-100 text-green-800' },

    // ## MEAL TYPE TAGS ##
    'main course': { icon: <MdDinnerDining className="mr-1 text-gray-600" />, color: 'bg-gray-100 text-gray-800' },
    'appetizer': { icon: <MdOutlineTapas className="mr-1 text-indigo-600" />, color: 'bg-indigo-100 text-indigo-800' },
    'dessert': { icon: <FaBirthdayCake className="mr-1 text-pink-600" />, color: 'bg-pink-100 text-pink-800' },
    'sweets': { icon: <FaBirthdayCake className="mr-1 text-pink-600" />, color: 'bg-pink-100 text-pink-800' },
    'snack': { icon: <IoFastFoodOutline className="mr-1 text-yellow-600" />, color: 'bg-yellow-100 text-yellow-800' },
    'breakfast': { icon: <MdFreeBreakfast className="mr-1 text-amber-600" />, color: 'bg-amber-100 text-amber-800' },
    'beverage': { icon: <IoCafe className="mr-1 text-amber-700" />, color: 'bg-amber-100 text-amber-800' }, // <-- Changed to Amber/Orange color

    // ## CUISINE/STYLE TAGS ##
    'curry': { icon: <GiBowlOfRice className="mr-1 text-orange-600" />, color: 'bg-orange-100 text-orange-800' },
    'healthy': { icon: <FaCarrot className="mr-1 text-lime-600" />, color: 'bg-lime-100 text-lime-800' }, // <-- Icon is present
    'street food': { icon: <IoFastFoodOutline className="mr-1 text-yellow-600" />, color: 'bg-yellow-100 text-yellow-800' },

    // ## REGIONAL TAGS (COMMON NEUTRAL COLOR) ##
    'north indian': { color: 'bg-slate-100 text-slate-800' },
    'south indian': { color: 'bg-slate-100 text-slate-800' },
    'punjabi': { color: 'bg-slate-100 text-slate-800' },
    'gujarati': { color: 'bg-slate-100 text-slate-800' },
    'mughlai': { color: 'bg-slate-100 text-slate-800' },
    'bengali': { color: 'bg-slate-100 text-slate-800' },
    'kashmiri': { color: 'bg-slate-100 text-slate-800' },
    'maharashtrian': { color: 'bg-slate-100 text-slate-800' },
    'coastal': { color: 'bg-slate-100 text-slate-800' },

    // ## INGREDIENT-BASED TAGS ##
    'lentils': { color: 'bg-stone-100 text-stone-800' },
    'rice dish': { color: 'bg-slate-100 text-slate-800' },
    'steamed': { color: 'bg-cyan-100 text-cyan-800' },
  };

  return styles[normalizedTag] || { color: 'bg-gray-100 text-gray-800' };
};