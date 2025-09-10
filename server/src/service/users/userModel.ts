import mongoose from "mongoose";
import { User } from "./userType"

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    isLogin: {
      type: Boolean,
      default: false
    }

  }, {
  timestamps: true
})

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;