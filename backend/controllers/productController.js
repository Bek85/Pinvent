const asyncHandler = require('express-async-handler');

const createProduct = asyncHandler(async (req, res) => {
  res.send('create product endpoint');
});

module.exports = { createProduct };
