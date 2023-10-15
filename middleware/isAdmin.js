import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Anda tidak diizinkan akses." });
    }

    const decoded = jwt.verify(refreshToken, "RefreshToken");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Anda tidak diizinkan akses." });
    }

    if (user.role === "admin") {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Anda tidak memiliki izin akses sebagai admin." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
