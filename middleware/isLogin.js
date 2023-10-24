import User from "../models/User.js";

export const isLogin = async (req, res, next) => {
  try {
    const userId = req.session.id;

    if (!userId) {
      const err = new Error("Not authorized! Go back!");
      err.status = 401;
      return next(err);
    }

    const user = await User.findById(userId);

    if (user === null) {
      const err = new Error("Not authorized! Go back!");
      err.status = 401;
      return next(err);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan dalam memproses permintaan." });
  }
};
