const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Handle "Bearer " prefix if the token is sent in the Authorization header
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Check if the token exists in MongoDB sessions
    const session = await Session.findOne({ userId: decoded.id, token });
    if (!session) {
      return res
        .status(401)
        .json({ message: "Session expired, please log in again" });
    }

    // ✅ Attach user details to request
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

const isOrganizer = (req, res, next) => {
  if (req.user.role === "organizer" || req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as organizer" });
  }
};

module.exports = { authenticate, isOrganizer };
