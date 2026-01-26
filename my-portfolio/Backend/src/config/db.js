const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug: Check if the URI is actually being read
    if (!process.env.MONGO_URI) {
      console.error('❌ DEBUG: process.env.MONGO_URI is undefined. Check your .env file location.');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DATABASE ERROR: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;