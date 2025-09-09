import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "Use verify successfully" })
  } catch (error) {
    next(createHttpError(500, `internal server error${error}`))
  }

}