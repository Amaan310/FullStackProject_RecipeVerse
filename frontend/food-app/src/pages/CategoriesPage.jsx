import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

export default function CategoriesPage() {
  const categories = useLoaderData();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
            EXPLORE RECIPES
          </p>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Browse by Category
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find your next favorite meal by exploring our diverse recipe categories.
          </p>
        </div>

        {categories && categories.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/recipes?category=${encodeURIComponent(category)}`}
                className="group block p-8 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {category}
                </h3>
                <p className="mt-2 text-gray-500">
                  View all recipes in the "{category}" category.
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-gray-500">No categories found.</p>
        )}
      </div>
    </div>
  );
}