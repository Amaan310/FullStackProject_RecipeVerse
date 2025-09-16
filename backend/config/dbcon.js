const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    if (!process.env.DATABASE_URL) {
        console.error('ERROR: DATABASE_URL environment variable is not set!');
        process.exit(1); 
    }

    mongoose.connect(process.env.DATABASE_URL) 
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.log('MongoDB connection failed');
        console.error(error.message);
        process.exit(1);
    });
};

module.exports = dbConnect;