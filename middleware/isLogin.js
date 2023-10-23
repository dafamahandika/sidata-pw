import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLogin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Anda harus masuk terlebih dahulu." });
    }
    const decoded = jwt.verify(refreshToken, "RefreshToken");
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Anda harus masuk terlebih dahulu." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
