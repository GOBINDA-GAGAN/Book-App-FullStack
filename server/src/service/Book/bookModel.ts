import mongoose, { Schema } from "mongoose";
import { Book } from "./bookType";

const bookSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    genre: { type: String, required: true },
    coverImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    file: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  {
    timestamps: true, // ✅ put it here
  }
);

const bookModel = mongoose.model<Book>("All-BOOK", bookSchema);

export default bookModel;
