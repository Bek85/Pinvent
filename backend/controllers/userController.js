const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

//* @desc Register a new user
//* @route POST /api/users
//* @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    throw new Error('Email has already been taken');
  }

  const newUser = await User.create({ name, email, password });

  // Generate jwt token
  const token = generateToken(newUser._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });

  if (newUser) {
    const { _id, name, email, photo, phone, bio } = newUser;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//* @desc Login user
//* @route POST /api/users/login
//* @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup');
  }
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate jwt token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

//* @desc Logout user
//* @route GET /api/users/logout
//* @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({ message: 'Successfully logged out' });
});

//* @desc Get user profile
//* @route GET /api/users/profile
//* @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

//* @desc Get user login status
//* @route GET /api/users/loggedin
//* @access Public
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.headers.cookie;

  if (!token) {
    res.json(false);
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verifiedToken);
  verifiedToken ? res.json(true) : res.json(false);
});

//* @desc Update user details
//* @route PATCH /api/users/updateuser
//* @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.photo = req.body.photo || photo;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//* @desc Update user password
//* @route PATCH /api/users/changepassword
//* @access Private
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  // Check if old password matches the password in database
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send('Password has been updated successfully');
  } else {
    res.status(400);
    throw new Error('Old password is incorrect');
  }
});

//* @desc Reset user password
//* @route POST /api/users/resetpassword
//* @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User does not exist');
  }

  // Delete token if it exists in database
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //* Create reset token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id;

  //* Hash token before saving to database
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //* Save token to database
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
  }).save();

  //* Construct reset url
  const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

  //* Reset email
  const message = `
    <h2>Hello ${user.name}!</h2>
    <p>Please use the link below to reset your password.</p>
    <p>The reset link is valid only for 30 minutes.</p>
    <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
    <p>Regards...</p>
    <p>Pinvent Team</p>
  `;

  const subject = 'Password Reset Request';
  const sendTo = user.email;
  const sendFrom = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, sendTo, sendFrom);
    res
      .status(200)
      .json({ success: true, message: 'Reset email has been sent' });
  } catch (error) {
    res.status(500);
    throw new Error('Email has not been sent. Please try again.');
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getLoginStatus,
  updateUser,
  changePassword,
  resetPassword,
};
