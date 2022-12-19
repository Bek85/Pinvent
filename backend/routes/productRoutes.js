const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { runValidation } = require('../validations');
const { productValidator } = require('../validations/product');

router.route('/').post(protect, productValidator, runValidation, createProduct);

module.exports = router;
