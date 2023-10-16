import { Login } from "../controllers/Auth.js";

import express from "express";

const routes = express.Router();
routes.post("/login", Login);
export default routes;
