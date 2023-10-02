import Regis from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const register = async (req, res) => {
  const { username, email, password, confpassword } = req.body;
  if (password !== confpassword) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const hashedpassword = await argon2.hash(password);
  const newUser = new Regis({
    username,
    password: hashedpassword,
    email,
  });

  const oldUser = await Regis.findOne({ username });
  if (oldUser) return res.status(400).json({ message: "User udah ada" });

  const user = await newUser.save();
  const userId = user._id;
  const userName = user.username;
  const token = jwt.sign({ userName, userId }, process.env.TOKEN_KEY, {
    expiresIn: "20s",
  });

  res.cookie(token);

  try {
    const oldUser = await Regis.findOne({ username });
    if (oldUser) return res.status(400).json({ message: "User udah ada" });

    const user = await newUser.save();
    const userId = user._id;
    const userName = user.username;
    const token = jwt.sign({ userName, userId }, process.env.TOKEN_KEY, {
      expiresIn: "20s",
    });

    res.cookie(token);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Itu kayanya gak lucky" });
  }
};
