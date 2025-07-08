import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config/config.js";

export const protect = async (req, res, next) => {
  let token;

  // Check header for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Attach user (without password) to request
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
