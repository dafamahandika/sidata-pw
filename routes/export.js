import { exportData } from "../controllers/eksportController";
import express from "express";

const routes = express.Router();
routes.get("/export", exportData);
export default routes;
