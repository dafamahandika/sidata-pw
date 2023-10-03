import { studentCreate, reaData } from "../controllers/Formulir.js";
import express from "express";

const routes = express.Router();
routes.post("/create", studentCreate);
routes.get("/get", reaData);
export default routes;
