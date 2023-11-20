import {
  exportGtkData,
  exportStudentData,
} from "../controllers/eksportController";
import express from "express";

const routes = express.Router();
routes.get("/export-gtk", exportGtkData);
routes.get("/export-student", exportStudentData);
export default routes;
