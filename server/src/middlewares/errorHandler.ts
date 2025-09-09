import { Request, Response } from "express";
import { HttpError } from "http-errors";
import { _Config } from "../config/config";

export const globalError = (
  err: HttpError,
  req: Request,
  res: Response,
  // next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errorStack: _Config.env === "development" ? err.stack : "",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
