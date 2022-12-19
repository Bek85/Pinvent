const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, qty, price, description } = req.body;
  const user = req.user;
  const product = await Product.create({
    name,
    sku,
    category,
    qty,
    price,
    description,
    user: user._id,
  });
  res.status(201).json(product);
});

module.exports = { createProduct };
