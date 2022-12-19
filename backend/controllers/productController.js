const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/formatFileSize');

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, qty, price, description } = req.body;
  const user = req.user;

  //* Handle image upload

  let fileData = {};
  if (req.file) {
    //* Save image to cloudinary

    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Pinvent',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      console.log(error);
      throw new Error('Image could not be uploaded.');
    }
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
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
