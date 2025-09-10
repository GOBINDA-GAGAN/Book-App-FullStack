import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { cloudinary } from "../../config/cloudinary";
import path from "node:path";


// Create Book
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {



    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1)
    const filename = files.coverImage[0].filename;


    const filePath = path.resolve(__dirname, "../../../public/data/uploads", filename);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "Book-Cover",
      format: coverImageMimeType
    })

    const bookFileName = files.file[0].filename;
    const bookPath = path.resolve(__dirname, "../../../public/data/uploads", bookFileName);
     const bookMimeType = files.file[0].mimetype.split("/").at(-1)

    const uploadBookResult = await cloudinary.uploader.upload(bookPath, {
      resource_type:"raw",
      filename_override: bookFileName,
      folder: "Book-PDF",
      format: bookMimeType
    })

    console.log(uploadResult);
    console.log(uploadBookResult);



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
