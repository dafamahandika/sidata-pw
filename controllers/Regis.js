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

    const userCount = await User.countDocuments();

    if (userCount < 4) {
      newUser.role = "admin";
    } else if (userCount >= 4 && userCount <= 60) {
      newUser.role = "guru";
    } else {
      newUser.role = "student";
    }

    const savedUser = await newUser.save();

    res.status(200).json({
      userId: savedUser._id,
      username: savedUser.username,
      role: savedUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAccount = async (req, res) => {
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
      role: "guru",
    });

    const savedAdmin = await newAdmin.save();

    res
      .status(200)
      .json({ userId: savedAdmin._id, username: savedAdmin.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
