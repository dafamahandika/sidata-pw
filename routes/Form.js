import {
  isRayon,
  isRombel,
  studentCreate,
  reaData,
  updateData,
  delData,
} from "../controllers/Formulir.js";
import { isAdmin } from "../middleware/isAdmin.js";
import express from "express";

const routes = express.Router();
routes.post("/rayon", isAdmin, isRayon);
routes.post("/rombel", isAdmin, isRombel);
routes.post("/create", isAdmin, studentCreate);
routes.get("/get", isAdmin, reaData);
routes.put("/update/:id", isAdmin, updateData);
routes.delete("/delete/:id", isAdmin, delData);
export default routes;
