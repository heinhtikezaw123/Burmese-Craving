const { check } = require("express-validator");
const db = require("../../models/db");
const User = db.User;

exports.register = [
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
      if (user) {
        throw new Error("Email already exists.");
      }
      return true;
    }),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("name").not().isEmpty().withMessage("Name is Required"),
];
