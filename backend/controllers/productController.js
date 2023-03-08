const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/formatFileSize');

//* @desc Create a new product
//* @route POST /api/products
//* @access Private
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

//* @desc Get all products for a particular user
//* @route GET /api/products
//* @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user._id }).sort(
    '-createdAt'
  );
  res.status(200).json(products);
});

//* @desc Get a single product for a particular user
//* @route GET /api/products/:id
//* @access Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  console.log(product.user.toString());
  console.log(req.user._id.toString());

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json(product);
});

//* @desc Delete a single product for a particular user
//* @route DELETE /api/products/:id
//* @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await product.remove();
  res.status(200).json({ message: 'Product deleted' });
});

//* @desc Update a single product
//* @route PATCH /api/products/:id
//* @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, qty, price, description } = req.body;
  const { id: productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

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

  //* Update a product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: productId },
    {
      name,
      category,
      qty,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
