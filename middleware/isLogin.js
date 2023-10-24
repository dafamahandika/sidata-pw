export const isLogin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const err = new Error("Not authorized! Go back!");
    err.status = 401;
    return next(err);
  }
};
