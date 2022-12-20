const express = require('express');
const { contactUs } = require('../controllers/contactController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, contactUs);

module.exports = router;
