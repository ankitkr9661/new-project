// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getUserById,
  deleteAllUsers,
  deleteUserById
} from "../controllers/userController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

// -------------------- Public Routes --------------------
// Anyone can register or login
router.post("/register", registerUser);
router.post("/login", loginUser);

// -------------------- Protected Routes --------------------
// Only logged-in users can view their profile
router.get("/profile", authenticate, getUserProfile);

// -------------------- Admin-only Routes --------------------
//  Only ADMIN can see all users
router.get("/", authenticate, authorizeRole("ADMIN"), getAllUsers);

//  ADMIN can fetch any user by userId; USER can fetch only their own

router.get("/:userId", authenticate, getUserById);

//  Only ADMIN can delete all users
router.delete("/deleteAll", authenticate, authorizeRole("ADMIN"), deleteAllUsers);

// ADMIN can delete any user; USER can delete only self
router.delete("/delete/:userId", authenticate, deleteUserById);

export default router;
