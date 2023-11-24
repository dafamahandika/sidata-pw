import { Login, isLogout } from "../controllers/Auth.js";
// import passport from "../controllers/Auth.js";

import express from "express";

const routes = express.Router();
routes.post("/login", Login);
routes.post("/logout", isLogout);
// routes.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// routes.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/");
//   }
// );
export default routes;
