import express from "express";
import { createBook, deleteBook, getAllBooks, getBook, getBookById, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import { verifyUser } from "../../middlewares/authMiddleware";

const bookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../../public/data/uploads"),
  limits: { files: 3e7 }
})


// Create a new book
bookRouter.post("/create-book", verifyUser, upload.fields([
  {name: "coverImage", maxCount: 1},
  {name: "file", maxCount: 1},




]), createBook);

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