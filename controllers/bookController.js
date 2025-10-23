// controllers/bookController.js
import * as bookService from "../services/bookService.js";

export const addBook = async (req, res) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({ message: "Books fetched successfully", books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const book = await bookService.getBookById(bookId);
    res.status(200).json({ message: "Book fetched successfully", book });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    const updated = await bookService.updateBook(bookId, req.body);
    res.status(200).json({ message: "Book updated successfully", updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);
    await bookService.deleteBook(bookId);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
