const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB using environment variable
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/homechef');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;