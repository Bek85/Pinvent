const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getLoginStatus,
} = require('../controllers/userController');
const {
  userRegisterValidator,
  userLoginValidator,
} = require('../validations/auth');
const { runValidation } = require('../validations');
const { protect } = require('../middleware/authMiddleware');

router
  .route('/register')
  .post(userRegisterValidator, runValidation, registerUser);
router.route('/login').post(userLoginValidator, runValidation, loginUser);
router.route('/logout').get(logoutUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/loggedin').get(getLoginStatus);

module.exports = router;
