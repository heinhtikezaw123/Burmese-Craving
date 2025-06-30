const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET || "mandala";

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role_id: user.role_id },
    SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_LIFE || "30d" }
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    return decoded;
  } catch (error) {
    console.log("Token verification failed:", error.message);
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
