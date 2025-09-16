require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000; 

// database connectn
const dbConnect = require('./config/dbcon');
dbConnect();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const recipe = require("./routes/recipe");

app.use("/api/users", recipe);

app.get('/', (req, res) => {
    res.send("<h1>This is the Home Page</h1>");
});

app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});