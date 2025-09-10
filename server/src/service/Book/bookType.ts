import { User } from "../users/userType";

export interface Book {
  _id: string;
  title:string;
  author:User;
  genre:string;
  coverImage: { url: string; public_id: string };
  file: { url: string; public_id: string };
  createdAt:Date;
  updatedAt:Date
}