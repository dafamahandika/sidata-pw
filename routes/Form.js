import { studentCreate } from "../controllers/Formulir.js";
import express from "express";

const routes = express.Router();
routes.post("/create", studentCreate);

export default routes;
