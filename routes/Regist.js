import { register, createAccount } from "../controllers/Regis.js";
import express from "express";

const routes = express.Router();
routes.post("/register", register);
routes.post("/createAccount", createAccount);
export default routes;
