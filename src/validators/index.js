const { login } = require("./auth/login");
const { register } = require("./auth/register");
const { verifyOTP } = require("./auth/verify-otp");
const { emailCheck } = require("./auth/email-check");
const { resetPassword } = require("./auth/reset-password");
const { changePassword } = require("./auth/change-password");
const { testValidation } = require("./test/test");

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorObj = {};

  if (!errors.isEmpty()) {
    errors.array().forEach(({ path, msg }) => {
      errorObj[path] = msg;
    });
  }

  if (Object.keys(errorObj).length > 0) {
    return res.status(422).json({ errors: errorObj });
  }

  next();
  // if (!errors.isEmpty()) {
  //   const formattedErrors = errors.array().reduce((acc, err) => {
  //     acc[err.path] = err.msg;
  //     return acc;
  //   }, {});

  //   return res.status(422).json({
  //     errors: formattedErrors,
  //   });
  // }
  // next();
};

module.exports = {
  login,
  register,
  verifyOTP,
  emailCheck,
  resetPassword,
  changePassword,
  testValidation,
  validate,
};
