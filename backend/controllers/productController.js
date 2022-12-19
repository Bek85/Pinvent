const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/formatFileSize');

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, qty, price, description } = req.body;
  const user = req.user;

  //* Handle image upload

  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  //* Create a new product
  const product = await Product.create({
    name,
    sku,
    category,
    qty,
    price,
    description,
    user: user._id,
    image: fileData,
  });
  res.status(201).json(product);
});

module.exports = { createProduct };
