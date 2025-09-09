
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import UserModel from "./userModel";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = createHttpError(400, "All Field Required");
      return next(error);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: "User already exists 🚫" 
      });
    }

    return res.status(201).json({
      message: "user created successfully"
    })

  } catch (error) {


    return next(error)

  }
}

