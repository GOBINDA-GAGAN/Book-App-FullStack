
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { _Config } from "../config/config";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = createHttpError(400, "All Field Required");
      return next(error);
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists 🚫"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, password: hashPassword, email })

    const token = jwt.sign(
      { sub: newUser._id },
      _Config.JWT_SECRET,
      { expiresIn: "7d" }
    );
    

    await newUser.save();

    return res.status(201).json({
      message: "user created successfully",
      id: newUser._id,
      token: token ? token : "No token",
      data: newUser
    })

  } catch (error) {


    return next(error)

  }
}

