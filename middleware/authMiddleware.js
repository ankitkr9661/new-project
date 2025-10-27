// middleware/authMiddleware.js
import { verifyToken } from "../utils/jwt.js";
import * as userRepo from "../repositories/userRepository.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

   
    const user = await userRepo.findUserById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role middleware (optional)
export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: ${role}s only` });
    }
    next();
  };
};
