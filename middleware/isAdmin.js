import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

const isAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;

    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);

      if (decoded && decoded.role === "admin") {
        next();
      } else {
        res.status(403).json({ message: "Forbidden Must Admin" });
      }
    } catch (error) {
      throw new Error("Not Authorized, Please Login Again");
    }
  } else {
    throw new Error("There is no token attached to the cookie...");
  }
});

export default isAdmin;
