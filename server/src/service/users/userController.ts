
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { _Config } from "../../config/config";

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


    return next(createHttpError(500, `server error ${error}`))

  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      const error = createHttpError(400, "All Field Required");
      return next(error);
    }


    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found 🚫"
      });
    }


    const isMatch = await bcrypt.compare(password, existingUser.password);



    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    if (existingUser.isLogin) {
      return res.status(200).json({
        success: true,
        message: "User already logged in 🚀",
        data: existingUser
      });
    }
    const token = jwt.sign(
      { sub: existingUser._id },
      _Config.JWT_SECRET,
      { expiresIn: "7d" }
    )

    const isLogIn = existingUser.isLogin = true;
    await existingUser.save();

    return res.status(200).json({
      message: isLogIn ? "Login successfully" : "Already Login",
      token: token,
      data: existingUser
    })

  } catch (error) {
    return next(createHttpError(500, `server error ${error}`))
  }

}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { userId } = req.body; 
    const userId = "68bfea4b6118b72367493b1f"

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found 🚫"
      });
    }

    user.isLogin = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logout successful 🚪"
    });
  } catch (error) {
    return next(createHttpError(500, `Server error: ${error}`));
  }
};


