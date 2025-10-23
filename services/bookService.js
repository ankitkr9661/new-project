// services/bookService.js
import * as bookRepo from "../repositories/bookRepository.js";

export const addBook = async (data) => {
  return await bookRepo.createBook(data);
};

export const getAllBooks = async () => {
  return await bookRepo.findAllBooks();
};

export const getBookById = async (bookId) => {
  const book = await bookRepo.findBookById(bookId);
  if (!book) throw new Error("Book not found");
  return book;
};

export const updateBook = async (bookId, data) => {
  const updated = await bookRepo.updateBook(bookId, data);
  if (!updated[0]) throw new Error("Book not found");
  return updated;
};

export const deleteBook = async (bookId) => {
  const deleted = await bookRepo.deleteBook(bookId);
  if (!deleted) throw new Error("Book not found");
  return deleted;
};
