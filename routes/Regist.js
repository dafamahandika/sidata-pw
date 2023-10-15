import { register, createAccount } from "../controllers/Regis.js";
import { isAdmin } from "../middleware/isAdmin.js";
import express from "express";

const routes = express.Router();
routes.post("/register", register);
routes.post("/createAccount", isAdmin, createAccount);
export default routes;
