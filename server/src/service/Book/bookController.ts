import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { cloudinary } from "../../config/cloudinary";
import path from "node:path";
import bookModel from "./bookModel";
import { promises as fsPromises } from "fs";


interface AuthRequest extends Request {
  userId: string
}
// Create Book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const _req = req as AuthRequest;
    const userId = _req.userId;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // ✅ Upload cover image
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const filename = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, "../../../public/data/uploads", filename);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "Book-Cover",
      format: coverImageMimeType,
    });

    // ✅ Upload book file (PDF, EPUB, etc.)
    const bookFileName = files.file[0].filename;
    const bookPath = path.resolve(__dirname, "../../../public/data/uploads", bookFileName);
    const bookMimeType = files.file[0].mimetype.split("/").at(-1);

    const uploadBookResult = await cloudinary.uploader.upload(bookPath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "Book-PDF",
      format: bookMimeType,
    });

    // ✅ Save to DB with both URL + public_id
    const newBook = await bookModel.create({
      title,
      genre,
      author: userId,
      coverImage: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      file: {
        url: uploadBookResult.secure_url,
        public_id: uploadBookResult.public_id,
      },
    });

    // ✅ Delete local files after uploading
    await fsPromises.unlink(filePath);
    await fsPromises.unlink(bookPath);

    return res.status(201).json({
      success: true,
      message: "Book created successfully 📚",
      id: newBook._id,
    });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};


// Update Book
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;
    console.log(title, genre);


    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    const _req = req as AuthRequest
    if (book.author.toString() !== _req.userId) {
      return res.status(403).json({ message: "Unauthorized Person" })
    }



    return res.status(200).json({ message: "Book updated successfully ✍️" });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(createHttpError(400, "Book ID is required"));
    }


    const book = await bookModel.findById(id).populate({
      path: "author",
      select: "name email _id",
    });


    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }


    return res.status(200).json({
      success: true,
      message: "Single book fetched 📖",
      data: book,
    });

  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};

// Get All Books
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const books = await bookModel.find();


    if (!books || books.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No books found 📭",
        count: 0,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All books fetched 📚",
      count: books.length,
      data: books,
    });
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
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required in request body",
      });
    }

    // ✅ First check if book exists
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // ✅ Delete cover image if available
    if (book.coverImage) {
      await cloudinary.uploader.destroy(book.coverImage.public_id, { resource_type: "image" });
    }

    // ✅ Delete file if available
    if (book.file) {
      await cloudinary.uploader.destroy(book.file.public_id, { resource_type: "raw" });
    }

    // ✅ Delete from DB
    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      // theoretically this should not happen since we already found the book
      return res.status(404).json({
        success: false,
        message: "Book already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted from DB & Cloudinary 🗑️",
      data: deletedBook,
    });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};
