const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const colors = require('colors');
const connectDB = require('./config/connectDB');
const PORT = process.env.PORT || 8000;
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware setup
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('tiny'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
          .yellow.bold
      )
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
