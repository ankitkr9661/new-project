// routes/bookRoutes.js
import express from "express";
import { addBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import { authenticate, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Admin-only
router.post("/", authenticate, authorizeRole("ADMIN"), addBook);
router.put("/:bookId", authenticate, authorizeRole("ADMIN"), updateBook);
router.delete("/:bookId", authenticate, authorizeRole("ADMIN"), deleteBook);

// 👤 Any logged-in user can view
router.get("/", authenticate, getAllBooks);
router.get("/:bookId", authenticate, getBookById);

export default router;
