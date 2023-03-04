const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  try {
    const { cookie } = req.headers;

    const token = cookie.split('token=')[1].split(';')[0];

    // const token = req.headers.cookie;

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, please login');
    }

    // Verify token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get user id from verified token
    const user = await User.findById(verifiedToken.id).select('-password');

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401);
    throw new Error('User not authorized');
  }
});

module.exports = { protect };
