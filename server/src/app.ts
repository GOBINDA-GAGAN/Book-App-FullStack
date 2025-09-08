import express, { Request, Response } from "express"

const app = express();

//Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Book API 🚀",
    success: true,
    status: 200,
    timestamp: new Date().toISOString()
  });
})



export default app;


