import express, { Request, Response } from "express";
import { registerUser } from "./userController";

const userRouter = express.Router();
userRouter.post("/register", registerUser)


export default userRouter;