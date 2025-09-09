import dotenv from "dotenv"
dotenv.config();

const _config = {
  port: process.env.PORT,
  DB_URL:process.env.DB_URL,
  env:process.env.NODE_ENV,
 JWT_SECRET:process.env.JWT_SECRET as string
}

export const _Config = Object.freeze(_config)