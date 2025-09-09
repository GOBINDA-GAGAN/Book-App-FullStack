
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = createHttpError(400, "All Field Required");
      return next(error);
    }

    return res.status(200).json({
      message: "user created successfully"
    })

  } catch (error) {


    return next(error)

  }
}

