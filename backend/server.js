const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware setup

app.use(express.json());
app.use(cors());

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
