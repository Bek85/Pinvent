const { check, body } = require('express-validator');

const userRegisterValidator = [
  check('name', 'Name is required').not().isEmpty(),
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

const userLoginValidator = [
  check('email').not().isEmpty().withMessage('Please enter your email'),
  check('password').not().isEmpty().withMessage('Please enter your password'),
];

module.exports = { userRegisterValidator, userLoginValidator };
