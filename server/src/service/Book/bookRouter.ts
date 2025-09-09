import express from "express";
import {  createBook, deleteBook, getAllBooks, getBook, getBookById, updateBook } from "./bookController";

const bookRouter = express.Router();


// Create a new book
bookRouter.post("/create-book", createBook);

// Update a book by ID
bookRouter.put("/update-book/:id", updateBook);

// Get a single book (custom/filter)
bookRouter.get("/get-book", getBook);

// Get book by ID
bookRouter.get("/get-book/:id", getBookById);

// Get all books
bookRouter.get("/get-all-books", getAllBooks);

// Delete book by ID
bookRouter.delete("/delete-book/:id", deleteBook);



export default bookRouter;