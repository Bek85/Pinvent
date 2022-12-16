const User = require('../models/userModel');

const registerUser = (req, res) => {
  res.send('new user registered');
};

module.exports = { registerUser };
