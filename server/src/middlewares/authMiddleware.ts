import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";
import { _Config } from "../config/config";

interface MyJwtPayload extends JwtPayload {
  sub: string; // 👈 matches your token payload
}
interface AuthRequest extends Request {
  userId: string
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = jwt.verify(
      token,
      _Config.JWT_SECRET as string
    ) as MyJwtPayload;

   

    const _req = req as AuthRequest
    _req.userId = decoded.sub as string;

    next();
  } catch (error) {
    next(createHttpError(401, `Invalid or expired token: ${error}`));
  }
};
