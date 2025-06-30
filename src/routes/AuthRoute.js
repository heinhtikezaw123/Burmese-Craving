const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const validator = require('../validators');

router.post('/register', validator.register, validator.validate, AuthController.register);
router.post('/login', validator.login, validator.validate, AuthController.login);
router.post('/change-password', validator.changePassword, validator.validate, AuthController.changePassword);
router.post('/forgot-password', validator.emailCheck, validator.validate, AuthController.forgotPassword);
router.post('/reset-password', validator.resetPassword, validator.validate, AuthController.resetPassword);
router.post('/verify-otp', validator.verifyOTP, validator.validate, AuthController.verifyOTP);
router.post('/send-otp', validator.emailCheck, validator.validate, AuthController.sendOTP);

module.exports = router;
