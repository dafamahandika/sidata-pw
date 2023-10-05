import {
  isRayon,
  isRombel,
  studentCreate,
  reaData,
  updateData,
  delData,
} from "../controllers/Formulir.js";
import express from "express";

const routes = express.Router();
routes.post("/rayon", isRayon);
routes.post("/rombel", isRombel);
routes.post("/create", studentCreate);
routes.get("/get", reaData);
routes.put("/update/:id", updateData);
routes.delete("/delete/:id", delData);
export default routes;
