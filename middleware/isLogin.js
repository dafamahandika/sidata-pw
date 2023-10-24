import User from "../models/User";

export const isLogin = (req, res, next) => {
  if (req.session.userId) {
    const result = User.findById(req.session.userId);
    res.status(200).json(result);
    next();
  } else {
    const err = new Error("Not authorized! Go back!");
    err.status = 401;
    return next(err);
  }
};
