const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    throw new Error('Email has already been taken');
  }

  const newUser = await User.create({ name, email, password });

  if (newUser) {
    const { _id, name, email, photo, phone, bio } = newUser;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  newUser.save();
});

module.exports = { registerUser };
