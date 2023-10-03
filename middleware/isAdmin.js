import User from "../models/User.js";

const isAdmin = (req, res, next) => {
  if (req.User && req.User.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
export default isAdmin;
