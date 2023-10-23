import User from "../models/User.js";

export const isMuridGuru = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Anda harus masuk terlebih dahulu." });
    }

    if (user.role === "murid" || user.role === "guru") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Anda tidak diizinkan mengakses ini." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
