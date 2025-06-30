const { check } = require('express-validator');
const db = require('../../models/db');
const User = db.User;

exports.verifyOTP = [
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('This email is not registered.');
      }
      return true;
    }),

    check('otp')
    .not()
    .isEmpty()
    .withMessage('OTP is required'),
];
