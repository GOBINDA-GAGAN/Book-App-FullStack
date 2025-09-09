import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

// Create Book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("files:", req.files);


    return res.status(201).json({ message: "Book created successfully 📚" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Update Book
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {

    return res.status(200).json({ message: "Book updated successfully ✍️" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Get Single Book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {

    return res.status(200).json({ message: "Single book fetched 📖" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Get All Books
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {

    return res.status(200).json({ message: "All books fetched 📚" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Get Book (generic name, in case you need filtered search)
export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {

    return res.status(200).json({ message: "Book fetched ✅" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Delete Book
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // logic yaha likhna
    return res.status(200).json({ message: "Book deleted 🗑️" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};
