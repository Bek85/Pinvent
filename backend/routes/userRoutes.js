const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  getLoginStatus,
  updateUser,
  changePassword,
} = require('../controllers/userController');
const {
  userRegisterValidator,
  userLoginValidator,
  changePasswordValidator,
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
router.route('/updateuser').patch(protect, updateUser);
router
  .route('/changepassword')
  .patch(protect, changePasswordValidator, runValidation, changePassword);

module.exports = router;
