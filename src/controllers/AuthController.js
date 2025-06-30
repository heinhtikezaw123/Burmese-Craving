const bcrypt = require("bcryptjs");
const db = require("../models/db");
const User = db.User;
const mailSender = require("../utlis/mail");
const { generateToken, verifyToken } = require("../utlis/jwt");


const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    const user = await User.create({
      name,
      email,
      role_id,
      password: await bcrypt.hash(password, 10),
    });

    const otp = generateOTP();
    const subject = "Your OTP Code";
    const htmlContent = `<p>Your OTP code is <strong>${otp}</strong></p>`;

    await mailSender(email, subject, htmlContent);

    user.otp = otp;
    user.otp_expire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    return res.status(200).json({
      message: "Register Mail Sent Successfully!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        errors: {
          email: "User not found",
        },
      });
    }

    // ✅ Check if user account is inactive
    if (user.status === "inactive") {
      return res.status(403).json({
        errors: {
          error: "Unauthorized",
          message: "Your account is inactive",
        },
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        errors: {
          password: "Invalid password",
        },
      });
    }

    const token = generateToken(user);

    const userData = user.toJSON();
    delete userData.password;
    delete userData.otp;
    delete userData.otp_expire;

    return res.status(200).json({
      message: "Logged in successfully!",
      token: token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, old_password, password } = req.body;
    let user = await User.findOne({ where: { email } });

    if (!(await bcrypt.compare(old_password, user.password))) {
      return res.status(401).json({
        errors: {
          message: "Invalid credentials",
        },
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.save();

    res.status(200).json({
      success: "Change Password Successfully!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ where: { email } });

    const otp = generateOTP();
    const subject = "Your OTP Code";
    const htmlContent = `<p>Your OTP code is <strong>${otp}</strong></p>`;

    await mailSender(email, subject, htmlContent);

    user.otp = otp;
    user.otp_expire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    res.status(200).json({
      message: "Forgot Password Mail Sent Successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let user = await User.findOne({ where: { email } });
    const token = generateToken(user);

    if (user.otp !== otp || user.otp_expire < new Date()) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    user.is_verify = true;
    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully!",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    const decoded = verifyToken(token);

    const user = await User.findOne({
      where: { id: decoded.id, email: decoded.email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.save();

    res.status(200).json({
      message: "Password reset successfully!",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ where: { email } });

    const otp = generateOTP();
    const subject = "Your OTP Code";
    const htmlContent = `<p>Your OTP code is <strong>${otp}</strong></p>`;

    await mailSender(email, subject, htmlContent);

    user.otp = otp;
    user.otp_expire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    return res.status(200).json({
      message: "OTP send successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
