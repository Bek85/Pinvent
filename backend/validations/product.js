const { check } = require('express-validator');

const productValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('sku', 'Sku is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('qty', 'Quantity is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
];

module.exports = { productValidator };
