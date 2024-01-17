import { Login, isLogout } from "../controllers/Auth.js";

import express from "express";

const routes = express.Router();
routes.post("/login", Login);
routes.post("/logout", isLogout);

export default routes;
