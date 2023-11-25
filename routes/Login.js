import { Login, isLogout } from "../controllers/Auth.js";
import passport from "passport";

import express from "express";

const routes = express.Router();
const CLIENT_URL = process.env.PORT;
routes.post("/login", Login);
routes.post("/logout", isLogout);
routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
routes.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
export default routes;
