import React, { useEffect, useState } from "react";
import Modal from "./Model";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null); // Add state for the user object

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    // Set both login status and user data
    setLogin(!!token);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // This runs only once on mount. A better solution would be to use Context API.

  const updateLoginStatus = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    setLogin(!!token);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  const closeLogin = () => setIsOpen(false);

  const checkLogin = () => {
    if (isLogin) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLogin(false);
      setUser(null); // Clear the user state on logout
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm py-4 fixed w-full z-10 top-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-red-600 text-2xl font-bold">
              Food Recipes
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className="text-gray-600 hover:text-red-600 font-medium">
              Home
            </NavLink>
            <NavLink
              onClick={(e) => {
                if (!isLogin) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              to="/myRecipe"
              className="text-gray-600 hover:text-red-600 font-medium"
            >
              My Recipes
            </NavLink>
            <NavLink
              onClick={(e) => {
                if (!isLogin) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
              to="/favrecipes"
              className="text-gray-600 hover:text-red-600 font-medium"
            >
              Favorites
            </NavLink>
          </div>
          <div>
            <button
              onClick={checkLogin}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300"
            >
              {isLogin ? "Logout" : "Login"}
              {user?.email && ` (${user.email})`} {/* Use optional chaining on user */}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <Modal onClose={closeLogin}>
          <InputForm setIsOpen={setIsOpen} onLoginSuccess={updateLoginStatus} />
        </Modal>
      )}
    </>
  );
}