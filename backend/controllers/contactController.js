const asyncHandler = require('express-async-handler');

const contactUs = asyncHandler(async (req, res) => {
  res.send('contact us endpoint');
});

module.exports = { contactUs };
