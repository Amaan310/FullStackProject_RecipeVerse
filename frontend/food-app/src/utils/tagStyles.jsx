import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { GiMeat } from 'react-icons/gi';

export const getTagStyle = (tag) => {
  const normalizedTag = tag.toLowerCase().trim();

  const styles = {
    'vegetarian': { icon: <FaLeaf className="mr-1 text-green-600" />, color: 'bg-green-100 text-green-800' },
    'non-vegetarian': { icon: <GiMeat className="mr-1 text-red-600" />, color: 'bg-red-100 text-red-800' },
    'vegan': { icon: <FaLeaf className="mr-1 text-green-700" />, color: 'bg-green-100 text-green-800' },
    'italian': { color: 'bg-blue-100 text-blue-800' },
    'chinese': { color: 'bg-red-100 text-red-800' },
    'mexican': { color: 'bg-yellow-100 text-yellow-800' },
    'indian': { color: 'bg-orange-100 text-orange-800' },
    'north indian': { color: 'bg-orange-100 text-orange-800' },
    'south indian': { color: 'bg-orange-100 text-orange-800' },
    'dessert': { color: 'bg-pink-100 text-pink-800' },
    'appetizer': { color: 'bg-indigo-100 text-indigo-800' },
    'main course': { color: 'bg-gray-100 text-gray-800' },
  };

  return styles[normalizedTag] || { color: 'bg-gray-100 text-gray-800' };
};