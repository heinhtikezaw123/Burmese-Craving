const { verifyToken } = require("../utils/jwt");
const User = require("../db/models/user")(
  require("../config/database").db,
  require("sequelize").DataTypes
);

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token); // contains { id, email, role_id }

    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ error: "Invalid token user" });

    if (user.status !== "active") {
      return res.status(403).json({ error: "User is inactive" });
    }

    req.user = user; // attach full user object
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
