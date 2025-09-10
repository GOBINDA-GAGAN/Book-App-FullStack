import dotenv from "dotenv"
dotenv.config();

const _config = {
  port: process.env.PORT,
  DB_URL: process.env.DB_URL,
  env: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

}

export const _Config = Object.freeze(_config)