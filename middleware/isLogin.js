export const isLogin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Anda harus login atau daftar terlebih dahulu." });
  }
};
