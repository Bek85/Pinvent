const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 8000;
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
        // .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
