import express from "express";
import { refreshToken } from "../controllers/Auth.js";

const routes = express.Router();
routes.get("/token", refreshToken);
export default routes;
