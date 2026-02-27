import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ success: false, error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export default authMiddleware;
