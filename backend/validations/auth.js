const { check, body } = require('express-validator');

const userRegisterValidator = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email', 'Email is required')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password', 'Password is required')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = { userRegisterValidator };
