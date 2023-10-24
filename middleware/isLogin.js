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

    const decoded = jwt.verify(accessToken, "AccessToken");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Anda harus login terlebih dahulu." });
    }

    if (user.hasAccount) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Anda belum memiliki akun." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
