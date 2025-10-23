// repositories/bookRepository.js
import Book from "../models/bookModel.js";

export const createBook = async (data) => {
  return await Book.create(data);
};

export const findAllBooks = async () => {
  return await Book.findAll({ attributes: ["bookId", "title", "author", "price", "publishedYear"] });
};

export const findBookById = async (bookId) => {
  return await Book.findOne({
    where: { bookId },
    attributes: ["bookId", "title", "author", "price", "publishedYear"],
  });
};

export const updateBook = async (bookId, data) => {
  return await Book.update(data, { where: { bookId } });
};

export const deleteBook = async (bookId) => {
  return await Book.destroy({ where: { bookId } });
};
