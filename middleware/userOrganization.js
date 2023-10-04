import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

const userOrganization = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
  
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
          const user = await User.findOne({ where: { id: decoded?.id } });
  
          if (user) {
            req.user = user;
            next();
          } else {
            next(new Error("User not found"));
          }
        }
      } catch (error) {
        next(new Error("Not Authorized, Please Login Again"));
      }
    } else {
      next(new Error("There is no token attached to the cookie..."));
    }
  });
  

export default userOrganization;
