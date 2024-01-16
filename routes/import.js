import express from "express";
import { imporDataStudentCsv } from "../controllers/importController.js";
const routes = express.Router();
routes.post("/import-csv", imporDataStudentCsv);
export default routes;
