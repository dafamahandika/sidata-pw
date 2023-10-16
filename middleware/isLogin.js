import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const isLogin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Silahkan Login terlebih dahulu" });
    }
    const decoded = jwt.verify(token, "Berchanda");
    const user = await User.findById(decoded);
    if (!user) {
      return res.status(401).json({ message: "Anda tidak diizinkan akses." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
