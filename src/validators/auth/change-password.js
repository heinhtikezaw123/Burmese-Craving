const { check } = require("express-validator");
const db = require("../../models/db");
const User = db.User;

exports.changePassword = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error("User not found.");
      }
      return true;
    }),

  check("old_password").not().isEmpty().withMessage("Old password is Required"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  check("confirm_password")
    .not()
    .isEmpty()
    .withMessage("Confirm password is Required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirm password do not match.");
      }
      return true;
    }),
];
