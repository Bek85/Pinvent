const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(400);
    throw new Error('User not found. Please sign up.');
  }

  const sendTo = process.env.EMAIL_USER;
  const sendFrom = process.env.EMAIL_USER;
  const replyTo = user.email;
  try {
    await sendEmail(subject, message, sendTo, sendFrom, replyTo);
    res
      .status(200)
      .json({ success: true, message: 'Email has been sent successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Email has not been sent. Please try again.');
  }
});

module.exports = { contactUs };
