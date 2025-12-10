const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const apiRouter = require('./routes/router');
const { connectDB } = require('./config/db');

app.use(express.json());

// Explicit CORS config for debugging (Allow All)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request logger to debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ msg: "Error Not Found" });
});

async function startServer() {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
