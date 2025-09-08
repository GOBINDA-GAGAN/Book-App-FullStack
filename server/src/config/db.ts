import mongoose from "mongoose"
import { _Config } from "./config";

const dbConnection = async () => {
  try {
    mongoose.connection.on("connected", () => {

      console.log("DB Connected successfully 🟢");
    })
    mongoose.connection.on("error", () => {

      console.log("DB Connected error 🔥");
    })

    await mongoose.connect(_Config.DB_URL as string);

  } catch (error) {
    console.error("connection error 🔴", error);
    process.exit(1)
  }

}
export default dbConnection;