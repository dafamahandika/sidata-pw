import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  googleEmail: String,
  role: { type: String, default: "murid" },
});

const UserGoogle = mongoose.model("UserGoogle", userSchema);
export default UserGoogle;
