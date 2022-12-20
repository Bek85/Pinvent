const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { runValidation } = require('../validations');
const { productValidator } = require('../validations/product');
const upload = require('../utils/fileUpload');

router
  .route('/')
  .get(protect, getProducts)
  .post(
    protect,
    upload.single('image'),
    productValidator,
    runValidation,
    createProduct
  );

router
  .route('/:id')
  .get(protect, getProduct)
  .delete(protect, deleteProduct)
  .patch(protect, upload.single('image'), updateProduct);

module.exports = router;
