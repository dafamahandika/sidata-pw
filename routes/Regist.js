import { register } from "../controllers/Regis.js";
import express from "express";

const routes = express.Router();
routes.post("/register", register);
export default routes;
