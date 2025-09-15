# 🍲 Food Recipe MERN App

A full-stack **Food Recipe Management Application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to **sign up, log in, add recipes, and view recipes** with authentication using JWT.

---

## 🚀 Features
- User Authentication (Signup & Login) with JWT
- Secure Password Hashing with **bcryptjs**
- Add Recipes with **Image Upload**
- View All Recipes (with Creator Info)
- RESTful API with Express & MongoDB
- Protected Routes with Middleware
- Modern UI with React + Tailwind CSS (Frontend)

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT & bcryptjs
- **File Uploads**: Multer

---

## 📂 Project Structure
```bash
├── backend
    ├── .env
    ├── config
    │   └── dbcon.js
    ├── controller
    │   ├── createrecipe.js
    │   ├── deleterecipe.js
    │   ├── getrecipe.js
    │   ├── updaterecipe.js
    │   ├── userlogin.js
    │   ├── userprofile.js
    │   └── usersingup.js
    ├── middleware
    │   └── auth.js
    ├── model
    │   ├── recipe.js
    │   └── user.js
    ├── public
    │   └── images
    │      
    ├── routes
    │   └── recipe.js
    └── server.js
└── frontend
    └── food-app
        ├── src
            ├── App.css
            ├── App.jsx
            ├── assets
            │   ├── foodrecipe.avif
            │   └── react.svg
            ├── compoents
            │   ├── Footer.jsx
            │   ├── InputForm.jsx
            │   ├── LatestRecipes.jsx
            │   ├── Model.jsx
            │   ├── Navbar.jsx
            │   ├── Recipeitems.jsx
            │   └── mainNavigations.jsx
            ├── main.jsx
            └── pages
            │   ├── AddFoodRecipe.jsx
            │   ├── EditRecipe.jsx
            │   ├── RecipeDetails.jsx
            │   └── home.jsx
        └── vite.config.js
```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KanishkRajTech/Food-app.git
cd Food-app

```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
## Create a .env file inside backend/ and add:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```
Run backend:
```bash
npm run dev
```
3️⃣ Frontend Setup
```bash
cd ../frontend/food-app
npm install
npm run dev
```
### 🤝 Contribution
## Contributions are welcome! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature.
3. Commit your changes: git commit -m 'Add a new feature'.
4. Push to the branch: git push origin feature/your-feature.
5. Open a Pull Request.

### 📝 License
## This project is licensed under the [MIT License](./LICENSE).


### 👨‍💻 Author

## Kanishk Raj
📧 Email: your-kanishkraj600@gmil.com
