import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // googleId: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "guru", "student"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
