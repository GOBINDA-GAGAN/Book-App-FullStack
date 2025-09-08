import dotenv from "dotenv"
dotenv.config();

const _config = {
  port: process.env.PORT,
  DB_URL:process.env.DB_URL
}

export const _Config = Object.freeze(_config)