// middleware/authorizeRole.js

/**
 * Middleware to restrict route access based on user roles.
 * @param {string|string[]} roles - Allowed role(s), e.g., "ADMIN" or ["ADMIN", "MANAGER"]
 */
const authorizeRole = (roles) => {
  return (req, res, next) => {
    try {
      // Ensure req.user is available (comes from authMiddleware)
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: User not authenticated" });
      }

      // Normalize roles into an array if a single string is passed
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      // Check if user's role is included in allowedRoles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Access denied: Role '${req.user.role}' not permitted`,
        });
      }

      next();
    } catch (error) {
      console.error("AuthorizeRole Middleware Error:", error.message);
      return res.status(500).json({ message: "Internal server error in role authorization" });
    }
  };
};

export default authorizeRole;
