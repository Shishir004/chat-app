const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

const dbconnection = async () => {
    try {
        const connection = await mongoose.connect(URL);
        console.log("Connected to MongoDB successfully 🚀");
    } catch (error) {
        console.error("MongoDB Connection Error ❌:", error);
    }
};

module.exports = dbconnection;
