import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLogin = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Anda harus login terlebih dahulu." });
    }

    jwt.verify(accessToken, "AccessTokenSecret", async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Token akses tidak valid atau kedaluwarsa." });
      }

      const user = await User.findById(decoded.userId);

      if (!user) {
        return res
          .status(401)
          .json({ message: "Anda harus login terlebih dahulu." });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
