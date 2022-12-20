const express = require('express');
const { contactUs } = require('../controllers/contactController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { contactValidator } = require('../validations/contact');
const { runValidation } = require('../validations');

router.route('/').post(protect, contactValidator, runValidation, contactUs);

module.exports = router;
