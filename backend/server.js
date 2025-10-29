require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// database connection
const dbConnect = require('./config/dbcon');
dbConnect();

const allowedOrigins = [
    'http://localhost:5173',
    'https://foodverse07.netlify.app' 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// middleware
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/recipe");

app.use("/api/users", apiRoutes); 

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