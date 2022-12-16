const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { userRegisterValidator } = require('../validations/auth');
const { runValidation } = require('../validations');

router
  .route('/register')
  .post(userRegisterValidator, runValidation, registerUser);

module.exports = router;
