import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isLogin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Anda harus login atau daftar terlebih dahulu." });
    }

    // Verifikasi refreshToken
    jwt.verify(refreshToken, "RefreshTokenSecret", async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Refresh token tidak valid atau kedaluwarsa." });
      }

      // Cari pengguna berdasarkan ID yang ada di refreshToken
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
