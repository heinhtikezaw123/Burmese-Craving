const { check } = require('express-validator');

exports.resetPassword = [
  check('token')
  .not()
  .isEmpty()
  .withMessage('Token is required'),

  check('password')
  .not()
  .isEmpty()
  .withMessage("Password is Required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long"),

  check('confirm_password')
  .not()
  .isEmpty()
  .withMessage("Confirm password is Required")
  .bail()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password and confirm password do not match.');
    }
    return true;
  })
];
