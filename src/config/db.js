require('dotenv').config();
const mongoose = require('mongoose');

const clientOptions = {
  dbName: 'portfolio',
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
