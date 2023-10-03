import User from "../models/User.js";
import argon2 from "argon2";

export const register = async (req, res) => {
  const { username, email, password, confpassword } = req.body;
  if (password !== confpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = await argon2.hash(password);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Cek jika tidak ada user lainnya, set role admin
    const isFirstUser = (await User.countDocuments()) === 0;
    if (isFirstUser) {
      newUser.role = "admin";
    }

    const savedUser = await newUser.save();

    res.status(200).json({ userId: savedUser._id, username: savedUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);

    const newAdmin = new User({
      username,
      password: hashedPassword,
      email,
      role: "admin",
    });

    const savedAdmin = await newAdmin.save();

    res.status(200).json({ userId: savedAdmin._id, username: savedAdmin.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
