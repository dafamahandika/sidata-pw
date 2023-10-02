import { create } from "../controllers/Formulir.js";
import express from "express";

const routes = express.Router();
routes.post("/create", create);
export default routes;
