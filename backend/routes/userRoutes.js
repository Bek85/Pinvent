const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../validations/auth');
const { runValidation } = require('../validations');

router
  .route('/register')
  .post(userRegisterValidator, runValidation, registerUser);
router.route('/login').post(userLoginValidator, runValidation, loginUser);

module.exports = router;
