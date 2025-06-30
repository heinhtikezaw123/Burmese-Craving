const { check } = require('express-validator');
const db = require('../../models/db');
const User = db.User;

exports.login = [
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
        throw new Error('User is not registered.');
      }
      return true;
    }),

    check('password')
    .not()
    .isEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
