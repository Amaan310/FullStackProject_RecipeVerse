require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// database connection
const dbConnect = require('./config/dbcon');
dbConnect();

// middleware
app.use(express.json());

const allowedOrigins = [
    'https://foodverse-frontend.vercel.app',
    'https://foodverse-frontend-r5f7856dm-amaans310s-projects.vercel.app'
];

app.use(cors({
    origin: allowedOrigins
}));

app.use(express.static("public"));

const recipe = require("./routes/recipe");

app.use("/api/recipes", recipe); 

app.get('/', (req, res) => {
    res.send("<h1>This is the Home Page</h1>");
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});