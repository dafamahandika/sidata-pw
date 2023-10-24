import User from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const userId = user._id;
    const userEmail = user.email;
    const userName = user.username;

    // Buat refreshToken
    const refreshToken = jwt.sign(
      { userId, userEmail },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    // Simpan refreshToken ke database
    await User.updateOne({ _id: userId }, { refreshToken });

    // Buat accessToken
    const accessToken = jwt.sign(
      { userId, userName, userEmail },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );

    // Set refreshToken dalam cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Set accessToken dalam cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ token: accessToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Token refresh tidak valid" });
      }

      const userId = decoded.userId;
      const userName = decoded.userName;
      const userEmail = decoded.userEmail;

      const accessToken = jwt.sign(
        { userId, userName, userEmail },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.json({ message: "Token akses berhasil diperbarui" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const isLogout = (req, res, next) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error logging out:", err);
          return next(new Error("Error logging out"));
        }

        res.status(200).json({ message: "Logged out" });
      });
    } else {
      res.status(200).json({ message: "Logged out" });
    }
  } catch (err) {
    console.error("Error logging out:", err);
    next(new Error("Error logging out"));
  }
};
