const { check } = require('express-validator');

const contactValidator = [
  check('subject', 'Subject is required').not().isEmpty(),
  check('message', 'Message is required').not().isEmpty(),
];

module.exports = { contactValidator };
